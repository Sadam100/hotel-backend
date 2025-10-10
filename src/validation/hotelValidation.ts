import Joi from 'joi';
import { CreateHotelDto, UpdateHotelDto } from '../types/Hotel';

const roomTypes = ['Single', 'Double', 'Suite', 'Deluxe', 'Presidential'];
const validAmenities = ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Parking', 'Room Service'];

export const createHotelSchema = Joi.object<CreateHotelDto>({
  name: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Hotel name is required',
      'string.min': 'Hotel name must be at least 3 characters long',
      'string.max': 'Hotel name cannot exceed 100 characters',
      'any.required': 'Hotel name is required'
    }),
  
  location: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Location is required',
      'string.min': 'Location must be at least 2 characters long',
      'string.max': 'Location cannot exceed 100 characters',
      'any.required': 'Location is required'
    }),
  
  roomType: Joi.string()
    .valid(...roomTypes)
    .required()
    .messages({
      'any.only': 'Room type must be one of: Single, Double, Suite, Deluxe, Presidential',
      'any.required': 'Room type is required'
    }),
  
  pricePerNight: Joi.number()
    .min(0)
    .max(10000)
    .required()
    .messages({
      'number.min': 'Price cannot be negative',
      'number.max': 'Price cannot exceed $10,000',
      'any.required': 'Price per night is required'
    }),
  
  availableRooms: Joi.number()
    .integer()
    .min(0)
    .max(1000)
    .required()
    .messages({
      'number.base': 'Available rooms must be a number',
      'number.integer': 'Available rooms must be a whole number',
      'number.min': 'Available rooms cannot be negative',
      'number.max': 'Available rooms cannot exceed 1000',
      'any.required': 'Available rooms count is required'
    }),
  
  rating: Joi.number()
    .min(1)
    .max(5)
    .required()
    .messages({
      'number.min': 'Rating must be at least 1',
      'number.max': 'Rating cannot exceed 5',
      'any.required': 'Rating is required'
    }),
  
  checkInDate: Joi.date()
    .min('now')
    .required()
    .messages({
      'date.min': 'Check-in date cannot be in the past',
      'any.required': 'Check-in date is required'
    }),
  
  isPetFriendly: Joi.boolean()
    .default(false),
  
  amenities: Joi.array()
    .items(Joi.string().valid(...validAmenities))
    .default([])
    .messages({
      'array.includes': 'Invalid amenity provided'
    })
});

export const updateHotelSchema = Joi.object<UpdateHotelDto>({
  name: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .messages({
      'string.min': 'Hotel name must be at least 3 characters long',
      'string.max': 'Hotel name cannot exceed 100 characters'
    }),
  
  location: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .messages({
      'string.min': 'Location must be at least 2 characters long',
      'string.max': 'Location cannot exceed 100 characters'
    }),
  
  roomType: Joi.string()
    .valid(...roomTypes)
    .messages({
      'any.only': 'Room type must be one of: Single, Double, Suite, Deluxe, Presidential'
    }),
  
  pricePerNight: Joi.number()
    .min(0)
    .max(10000)
    .messages({
      'number.min': 'Price cannot be negative',
      'number.max': 'Price cannot exceed $10,000'
    }),
  
  availableRooms: Joi.number()
    .integer()
    .min(0)
    .max(1000)
    .messages({
      'number.base': 'Available rooms must be a number',
      'number.integer': 'Available rooms must be a whole number',
      'number.min': 'Available rooms cannot be negative',
      'number.max': 'Available rooms cannot exceed 1000'
    }),
  
  rating: Joi.number()
    .min(1)
    .max(5)
    .messages({
      'number.min': 'Rating must be at least 1',
      'number.max': 'Rating cannot exceed 5'
    }),
  
  checkInDate: Joi.date()
    .min('now')
    .messages({
      'date.min': 'Check-in date cannot be in the past'
    }),
  
  isPetFriendly: Joi.boolean(),
  
  amenities: Joi.array()
    .items(Joi.string().valid(...validAmenities))
    .messages({
      'array.includes': 'Invalid amenity provided'
    })
});
