export type RoomType = 'Single' | 'Double' | 'Suite' | 'Deluxe' | 'Presidential';

export interface IHotel {
  name: string;
  location: string;
  roomType: RoomType;
  pricePerNight: number;
  availableRooms: number;
  rating: number;
  checkInDate: Date;
  isPetFriendly: boolean;
  amenities: string[];
}

export interface CreateHotelDto {
  name: string;
  location: string;
  roomType: RoomType;
  pricePerNight: number;
  availableRooms: number;
  rating: number;
  checkInDate: string;
  isPetFriendly: boolean;
  amenities: string[];
}

export interface UpdateHotelDto extends Partial<CreateHotelDto> {}
