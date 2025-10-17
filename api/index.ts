import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import hotelRoutes from '../src/routes/hotelRoutes';
import { errorHandler, notFound } from '../src/middleware/errorHandler';

// Load environment variables
dotenv.config();

// Enhanced logging for debugging
console.log('🚀 API Server starting...');
console.log('Environment:', process.env.NODE_ENV);
console.log('MongoDB URI set:', !!process.env.MONGODB_URI);
console.log('Allowed Origins:', process.env.ALLOWED_ORIGINS);

const app = express();

// Trust proxy for Vercel serverless environment
app.set('trust proxy', 1);

// Database connection for serverless
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }

    await mongoose.connect(mongoURI);
    isConnected = true;
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
};

// Security middleware
app.use(helmet());

// Rate limiting - Configured for Vercel serverless
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  // Use a custom key generator for serverless
  keyGenerator: (req) => {
    // Use X-Forwarded-For header if available (Vercel sets this)
    const forwarded = req.headers['x-forwarded-for'];
    if (forwarded) {
      return Array.isArray(forwarded) ? forwarded[0] : forwarded.split(',')[0];
    }
    // Fallback to socket remote address
    return req.socket?.remoteAddress || 'unknown';
  }
});
app.use(limiter);

// CORS - Configure for serverless with better frontend support
const corsOptions = {
  origin: function (origin: string | undefined, callback: Function) {
    console.log('CORS Origin check:', origin);
    
    // Allow requests with no origin (like mobile apps, Postman, curl)
    if (!origin) {
      console.log('No origin - allowing request');
      return callback(null, true);
    }
    
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
      'http://localhost:3000',
      'https://hotel-app-alpha-six.vercel.app',
      'https://hotel-cloud-app.netlify.app',
    ];
    
    console.log('Allowed origins:', allowedOrigins);
    
    if (allowedOrigins.includes(origin)) {
      console.log('Origin allowed:', origin);
      callback(null, true);
    } else {
      console.log('Origin blocked:', origin);
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'Accept',
    'Origin',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers'
  ],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Handle preflight OPTIONS requests
app.options('*', (req, res) => {
  console.log('OPTIONS preflight request received');
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.status(200).end();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Hotel Management API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production'
  });
});

// Enhanced request logging middleware
app.use((req, res, next) => {
  console.log(`\n📥 ${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Headers:', {
    origin: req.headers.origin,
    'user-agent': req.headers['user-agent'],
    'content-type': req.headers['content-type']
  });
  console.log('Query params:', req.query);
  next();
});

// Middleware to ensure DB connection before handling requests
app.use(async (req, res, next) => {
  try {
    console.log('🔌 Checking database connection...');
    await connectDB();
    console.log('✅ Database connected successfully');
    next();
  } catch (error) {
    console.error('❌ Database connection error:', error);
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// API routes
app.use('/api/hotels', hotelRoutes);

// 404 handler
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

// Export the Express app for Vercel
export default app;
