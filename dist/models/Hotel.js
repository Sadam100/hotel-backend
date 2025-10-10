"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hotel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const HotelSchema = new mongoose_1.Schema({
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
            validator: function (value) {
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
            validator: function (amenities) {
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
HotelSchema.index({ name: 1, location: 1 });
HotelSchema.index({ roomType: 1 });
HotelSchema.index({ pricePerNight: 1 });
HotelSchema.index({ rating: -1 });
exports.Hotel = mongoose_1.default.model('Hotel', HotelSchema);
//# sourceMappingURL=Hotel.js.map