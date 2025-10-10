"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHotelStats = exports.deleteHotel = exports.updateHotel = exports.createHotel = exports.getHotelById = exports.getAllHotels = void 0;
const Hotel_1 = require("../models/Hotel");
const hotelValidation_1 = require("../validation/hotelValidation");
const getAllHotels = async (req, res) => {
    try {
        const { search, roomType, minPrice, maxPrice, minRating } = req.query;
        const filter = {};
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { location: { $regex: search, $options: 'i' } }
            ];
        }
        if (roomType) {
            filter.roomType = roomType;
        }
        if (minPrice || maxPrice) {
            filter.pricePerNight = {};
            if (minPrice)
                filter.pricePerNight.$gte = Number(minPrice);
            if (maxPrice)
                filter.pricePerNight.$lte = Number(maxPrice);
        }
        if (minRating) {
            filter.rating = { $gte: Number(minRating) };
        }
        const hotels = await Hotel_1.Hotel.find(filter).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: hotels.length,
            data: hotels
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching hotels',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.getAllHotels = getAllHotels;
const getHotelById = async (req, res) => {
    try {
        const { id } = req.params;
        const hotel = await Hotel_1.Hotel.findById(id);
        if (!hotel) {
            res.status(404).json({
                success: false,
                message: 'Hotel not found'
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: hotel
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching hotel',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.getHotelById = getHotelById;
const createHotel = async (req, res) => {
    try {
        const { error, value } = hotelValidation_1.createHotelSchema.validate(req.body);
        if (error) {
            res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: error.details.map(detail => detail.message)
            });
            return;
        }
        const hotelData = value;
        hotelData.checkInDate = new Date(hotelData.checkInDate);
        const hotel = new Hotel_1.Hotel(hotelData);
        await hotel.save();
        res.status(201).json({
            success: true,
            message: 'Hotel created successfully',
            data: hotel
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating hotel',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.createHotel = createHotel;
const updateHotel = async (req, res) => {
    try {
        const { id } = req.params;
        const { error, value } = hotelValidation_1.updateHotelSchema.validate(req.body);
        if (error) {
            res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: error.details.map(detail => detail.message)
            });
            return;
        }
        const updateData = value;
        if (updateData.checkInDate) {
            updateData.checkInDate = new Date(updateData.checkInDate);
        }
        const hotel = await Hotel_1.Hotel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (!hotel) {
            res.status(404).json({
                success: false,
                message: 'Hotel not found'
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Hotel updated successfully',
            data: hotel
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating hotel',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.updateHotel = updateHotel;
const deleteHotel = async (req, res) => {
    try {
        const { id } = req.params;
        const hotel = await Hotel_1.Hotel.findByIdAndDelete(id);
        if (!hotel) {
            res.status(404).json({
                success: false,
                message: 'Hotel not found'
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: 'Hotel deleted successfully',
            data: hotel
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting hotel',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.deleteHotel = deleteHotel;
const getHotelStats = async (req, res) => {
    try {
        const totalHotels = await Hotel_1.Hotel.countDocuments();
        const totalRooms = await Hotel_1.Hotel.aggregate([
            { $group: { _id: null, total: { $sum: '$availableRooms' } } }
        ]);
        const averageRating = await Hotel_1.Hotel.aggregate([
            { $group: { _id: null, average: { $avg: '$rating' } } }
        ]);
        const roomTypeStats = await Hotel_1.Hotel.aggregate([
            { $group: { _id: '$roomType', count: { $sum: 1 } } }
        ]);
        res.status(200).json({
            success: true,
            data: {
                totalHotels,
                totalAvailableRooms: totalRooms[0]?.total || 0,
                averageRating: averageRating[0]?.average ? Number(averageRating[0].average.toFixed(1)) : 0,
                roomTypeDistribution: roomTypeStats
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching statistics',
            error: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.getHotelStats = getHotelStats;
//# sourceMappingURL=hotelController.js.map