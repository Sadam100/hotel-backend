"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHotelSchema = exports.createHotelSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const roomTypes = ['Single', 'Double', 'Suite', 'Deluxe', 'Presidential'];
const validAmenities = ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant', 'Parking', 'Room Service'];
exports.createHotelSchema = joi_1.default.object({
    name: joi_1.default.string()
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
    location: joi_1.default.string()
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
    roomType: joi_1.default.string()
        .valid(...roomTypes)
        .required()
        .messages({
        'any.only': 'Room type must be one of: Single, Double, Suite, Deluxe, Presidential',
        'any.required': 'Room type is required'
    }),
    pricePerNight: joi_1.default.number()
        .min(0)
        .max(10000)
        .required()
        .messages({
        'number.min': 'Price cannot be negative',
        'number.max': 'Price cannot exceed $10,000',
        'any.required': 'Price per night is required'
    }),
    availableRooms: joi_1.default.number()
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
    rating: joi_1.default.number()
        .min(1)
        .max(5)
        .required()
        .messages({
        'number.min': 'Rating must be at least 1',
        'number.max': 'Rating cannot exceed 5',
        'any.required': 'Rating is required'
    }),
    checkInDate: joi_1.default.date()
        .min('now')
        .required()
        .messages({
        'date.min': 'Check-in date cannot be in the past',
        'any.required': 'Check-in date is required'
    }),
    isPetFriendly: joi_1.default.boolean()
        .default(false),
    amenities: joi_1.default.array()
        .items(joi_1.default.string().valid(...validAmenities))
        .default([])
        .messages({
        'array.includes': 'Invalid amenity provided'
    })
});
exports.updateHotelSchema = joi_1.default.object({
    name: joi_1.default.string()
        .trim()
        .min(3)
        .max(100)
        .messages({
        'string.min': 'Hotel name must be at least 3 characters long',
        'string.max': 'Hotel name cannot exceed 100 characters'
    }),
    location: joi_1.default.string()
        .trim()
        .min(2)
        .max(100)
        .messages({
        'string.min': 'Location must be at least 2 characters long',
        'string.max': 'Location cannot exceed 100 characters'
    }),
    roomType: joi_1.default.string()
        .valid(...roomTypes)
        .messages({
        'any.only': 'Room type must be one of: Single, Double, Suite, Deluxe, Presidential'
    }),
    pricePerNight: joi_1.default.number()
        .min(0)
        .max(10000)
        .messages({
        'number.min': 'Price cannot be negative',
        'number.max': 'Price cannot exceed $10,000'
    }),
    availableRooms: joi_1.default.number()
        .integer()
        .min(0)
        .max(1000)
        .messages({
        'number.base': 'Available rooms must be a number',
        'number.integer': 'Available rooms must be a whole number',
        'number.min': 'Available rooms cannot be negative',
        'number.max': 'Available rooms cannot exceed 1000'
    }),
    rating: joi_1.default.number()
        .min(1)
        .max(5)
        .messages({
        'number.min': 'Rating must be at least 1',
        'number.max': 'Rating cannot exceed 5'
    }),
    checkInDate: joi_1.default.date()
        .min('now')
        .messages({
        'date.min': 'Check-in date cannot be in the past'
    }),
    isPetFriendly: joi_1.default.boolean(),
    amenities: joi_1.default.array()
        .items(joi_1.default.string().valid(...validAmenities))
        .messages({
        'array.includes': 'Invalid amenity provided'
    })
});
//# sourceMappingURL=hotelValidation.js.map