import { Request, Response } from 'express';
import { Hotel } from '../models/Hotel';
import { CreateHotelDto, UpdateHotelDto } from '../types/Hotel';
import { createHotelSchema, updateHotelSchema } from '../validation/hotelValidation';

// GET /api/hotels - Get all hotels with optional filtering
export const getAllHotels = async (req: Request, res: Response) => {
  try {
    const { search, roomType, minPrice, maxPrice, minRating } = req.query;
    
    // Build filter object
    const filter: any = {};
    
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
      if (minPrice) filter.pricePerNight.$gte = Number(minPrice);
      if (maxPrice) filter.pricePerNight.$lte = Number(maxPrice);
    }
    
    if (minRating) {
      filter.rating = { $gte: Number(minRating) };
    }
    
    const hotels = await Hotel.find(filter).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: hotels.length,
      data: hotels
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching hotels',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// GET /api/hotels/:id - Get single hotel by ID
export const getHotelById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const hotel = await Hotel.findById(id);
    
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching hotel',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// POST /api/hotels - Create new hotel
export const createHotel = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate request body
    const { error, value } = createHotelSchema.validate(req.body);
    
    if (error) {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => detail.message)
      });
      return;
    }
    
    const hotelData: any = value;
    
    // Convert checkInDate string to Date object
    hotelData.checkInDate = new Date(hotelData.checkInDate);
    
    const hotel = new Hotel(hotelData);
    await hotel.save();
    
    res.status(201).json({
      success: true,
      message: 'Hotel created successfully',
      data: hotel
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating hotel',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// PUT /api/hotels/:id - Update hotel by ID
export const updateHotel = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    // Validate request body
    const { error, value } = updateHotelSchema.validate(req.body);
    
    if (error) {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => detail.message)
      });
      return;
    }
    
    const updateData: any = value;
    
    // Convert checkInDate string to Date object if provided
    if (updateData.checkInDate) {
      updateData.checkInDate = new Date(updateData.checkInDate);
    }
    
    const hotel = await Hotel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating hotel',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// DELETE /api/hotels/:id - Delete hotel by ID
export const deleteHotel = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const hotel = await Hotel.findByIdAndDelete(id);
    
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting hotel',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// GET /api/hotels/stats - Get hotel statistics
export const getHotelStats = async (req: Request, res: Response) => {
  try {
    const totalHotels = await Hotel.countDocuments();
    const totalRooms = await Hotel.aggregate([
      { $group: { _id: null, total: { $sum: '$availableRooms' } } }
    ]);
    
    const averageRating = await Hotel.aggregate([
      { $group: { _id: null, average: { $avg: '$rating' } } }
    ]);
    
    const roomTypeStats = await Hotel.aggregate([
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
