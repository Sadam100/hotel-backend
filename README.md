# Hotel Management API Backend

A robust Node.js + TypeScript backend API for the Hotel Management System with MongoDB and Mongoose.

## Features

- ✅ **RESTful API** with full CRUD operations
- ✅ **TypeScript** for type safety
- ✅ **MongoDB** with Mongoose ODM
- ✅ **Input validation** with Joi
- ✅ **Error handling** middleware
- ✅ **CORS** configuration
- ✅ **Rate limiting** for security
- ✅ **Environment variables** for configuration
- ✅ **Database indexing** for performance

## API Endpoints

### Hotels
- `GET /api/hotels` - Get all hotels (with optional filtering)
- `GET /api/hotels/stats` - Get hotel statistics
- `GET /api/hotels/:id` - Get single hotel by ID
- `POST /api/hotels` - Create new hotel
- `PUT /api/hotels/:id` - Update hotel by ID
- `DELETE /api/hotels/:id` - Delete hotel by ID

### Health Check
- `GET /health` - API health status

## Query Parameters for GET /api/hotels

- `search` - Search by hotel name or location
- `roomType` - Filter by room type (Single, Double, Suite, Deluxe, Presidential)
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `minRating` - Minimum rating filter

## Installation

1. **Install dependencies:**
```bash
cd backend
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env
```

3. **Update .env file with your MongoDB connection:**
```env
MONGODB_URI=mongodb://localhost:27017/hotel-management
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

## API Usage Examples

### Create Hotel
```bash
POST /api/hotels
Content-Type: application/json

{
  "name": "Grand Plaza Hotel",
  "location": "New York, NY",
  "roomType": "Deluxe",
  "pricePerNight": 250.00,
  "availableRooms": 15,
  "rating": 4.5,
  "checkInDate": "2025-10-15",
  "isPetFriendly": true,
  "amenities": ["WiFi", "Pool", "Gym", "Restaurant"]
}
```

### Get All Hotels with Filtering
```bash
GET /api/hotels?search=plaza&roomType=Deluxe&minPrice=200&maxPrice=300&minRating=4
```

### Update Hotel
```bash
PUT /api/hotels/:id
Content-Type: application/json

{
  "pricePerNight": 275.00,
  "availableRooms": 12
}
```

## Database Schema

### Hotel Model
```typescript
{
  name: string (required, 3-100 chars)
  location: string (required, 2-100 chars)
  roomType: enum ['Single', 'Double', 'Suite', 'Deluxe', 'Presidential']
  pricePerNight: number (0-10000)
  availableRooms: number (0-1000)
  rating: number (1-5)
  checkInDate: Date (future dates only)
  isPetFriendly: boolean (default: false)
  amenities: string[] (valid options: WiFi, Pool, Gym, Spa, Restaurant, Parking, Room Service)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/hotel-management` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` |

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed validation errors"] // Only for validation errors
}
```

## Security Features

- **Helmet.js** for security headers
- **Rate limiting** (100 requests per 15 minutes per IP)
- **CORS** configuration
- **Input validation** with Joi
- **MongoDB injection** protection with Mongoose

## Author

**Sadam Hussain** - Full Stack Developer

## License

MIT License
