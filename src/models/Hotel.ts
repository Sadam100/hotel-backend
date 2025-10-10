import mongoose, { Document, Schema } from 'mongoose';
import { IHotel, RoomType } from '../types/Hotel';

export interface IHotelDocument extends IHotel, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const HotelSchema = new Schema<IHotelDocument>({
  name: {
    type: String,
    required: [true, 'Hotel name is required'],
    trim: true,
    minlength: [3, 'Hotel name must be at least 3 characters long'],
    maxlength: [100, 'Hotel name cannot exceed 100 characters']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
    minlength: [2, 'Location must be at least 2 characters long'],
    maxlength: [100, 'Location cannot exceed 100 characters']
  },
  roomType: {
    type: String,
    required: [true, 'Room type is required'],
    enum: {
      values: ['Single', 'Double', 'Suite', 'Deluxe', 'Presidential'],
      message: 'Room type must be one of: Single, Double, Suite, Deluxe, Presidential'
    }
  },
  pricePerNight: {
    type: Number,
    required: [true, 'Price per night is required'],
    min: [0, 'Price cannot be negative'],
    max: [10000, 'Price cannot exceed $10,000']
  },
  availableRooms: {
    type: Number,
    required: [true, 'Available rooms count is required'],
    min: [0, 'Available rooms cannot be negative'],
    max: [1000, 'Available rooms cannot exceed 1000']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  checkInDate: {
    type: Date,
    required: [true, 'Check-in date is required'],
    validate: {
      validator: function(value: Date) {
        return value >= new Date();
      },
      message: 'Check-in date cannot be in the past'
    }
  },
  isPetFriendly: {
    type: Boolean,
    default: false
  },
  amenities: {
    type: [String],
    default: [],
    validate: {
      validator: function(amenities: string[]) {
        const validAmenities = ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Parking', 'Room Service'];
        return amenities.every(amenity => validAmenities.includes(amenity));
      },
      message: 'Invalid amenity provided'
    }
  }
}, {
  timestamps: true,
  versionKey: false
});

// Index for better query performance
HotelSchema.index({ name: 1, location: 1 });
HotelSchema.index({ roomType: 1 });
HotelSchema.index({ pricePerNight: 1 });
HotelSchema.index({ rating: -1 });

export const Hotel = mongoose.model<IHotelDocument>('Hotel', HotelSchema);
