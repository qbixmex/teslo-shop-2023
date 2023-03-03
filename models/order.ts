import mongoose, { Model, model, Schema } from 'mongoose';
import { IOrder } from '../interfaces';

const orderSchema = new Schema({
  // name: { type: String, required: true },
}, {
  timestamps: true,
});

const Order: Model<IOrder> = mongoose.models.Order || model('Order', orderSchema);

export default Order;
