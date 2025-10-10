import mongoose, { Document } from 'mongoose';
import { IHotel } from '../types/Hotel';
export interface IHotelDocument extends IHotel, Document {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Hotel: mongoose.Model<IHotelDocument, {}, {}, {}, mongoose.Document<unknown, {}, IHotelDocument, {}, {}> & IHotelDocument & Required<{
    _id: string;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Hotel.d.ts.map