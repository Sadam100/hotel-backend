# 🚀 Backend Deployment Guide

## Quick Deployment Options

### 1. Vercel (Recommended for Serverless)
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project" → "Import Git Repository"
4. Select your repository
5. Vercel will auto-detect the configuration from `vercel.json`

**Environment Variables to set in Vercel:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hotel-management
NODE_ENV=production
ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app
```

**Important Notes for Vercel:**
- The API is configured as serverless functions
- All routes are handled by `/api/index.ts`
- Database connections are optimized for serverless
- No need to set PORT (Vercel handles this automatically)

### 2. Railway (Recommended for Traditional Deployment)
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will auto-detect Node.js and deploy

**Environment Variables to set in Railway:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hotel-management
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### 2. Render
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New" → "Web Service"
4. Connect your GitHub repo
5. Configure:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Node Version**: 18

**Environment Variables:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hotel-management
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### 3. Heroku
1. Install Heroku CLI
2. Run commands:
```bash
cd backend
heroku create your-app-name
heroku config:set MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hotel-management
heroku config:set NODE_ENV=production
heroku config:set FRONTEND_URL=https://your-frontend-domain.vercel.app
git push heroku main
```

## Database Setup

### MongoDB Atlas (Recommended)
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create free account
3. Create new cluster
4. Get connection string
5. Replace `<password>` with your password
6. Use this as `MONGODB_URI`

## Frontend Configuration

After deploying backend, update your frontend API URL:

In `src/services/api.ts`, change:
```typescript
const API_BASE_URL = 'http://localhost:5000/api';
```

To:
```typescript
// For Vercel deployment
const API_BASE_URL = 'https://your-backend-domain.vercel.app/api';
// For Railway deployment
const API_BASE_URL = 'https://your-backend-domain.railway.app/api';
// For Render deployment
const API_BASE_URL = 'https://your-backend-domain.render.com/api';
```

## Testing Deployment

1. Check backend health: `GET https://your-backend-domain.vercel.app/health`
2. Test API endpoints: `GET https://your-backend-domain.vercel.app/api/hotels`
3. Test CORS: Open browser console on frontend
4. Verify database connection in Vercel function logs

## Troubleshooting

### Common Issues:
1. **CORS Error**: Update `FRONTEND_URL` environment variable
2. **Database Connection**: Check MongoDB URI format
3. **Build Fails**: Ensure all dependencies are in `dependencies`, not `devDependencies`
4. **Port Issues**: Most platforms auto-assign PORT, use `process.env.PORT || 5000`

### Environment Variables Checklist:
- ✅ `MONGODB_URI` - MongoDB connection string
- ✅ `NODE_ENV=production`
- ✅ `FRONTEND_URL` - Your Vercel frontend URL
- ✅ `PORT` - Usually auto-set by platform
