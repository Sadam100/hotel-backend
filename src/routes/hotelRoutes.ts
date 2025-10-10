import { Router } from 'express';
import {
  getAllHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel,
  getHotelStats
} from '../controllers/hotelController';

const router = Router();

// Hotel routes
router.get('/', getAllHotels);
router.get('/stats', getHotelStats);
router.get('/:id', getHotelById);
router.post('/', createHotel);
router.put('/:id', updateHotel);
router.delete('/:id', deleteHotel);

export default router;
