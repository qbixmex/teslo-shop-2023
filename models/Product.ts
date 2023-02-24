import mongoose, { Model, Schema } from 'mongoose';
import { IProduct } from '../interfaces';

const productSchema = new Schema({
  description: { type: String, required: true },
  images: [{ type: String }],
  inStock: { Type: Number, required: true, default: 0 },
  price: { Type: Number, required: true, default: 0 },
  sizes: [{
    type: String,
    enum: {
      values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      message: '{VALUE}: is not a valid size!'
    }
  }],
  slug: { Type: String, required: true, unique: true },
  tags: [{ type: String }],
  title: { Type: String, required: true },
  type: {
    type: String,
    enum: {
      values: ['shirts', 'pants', 'hoodies', 'hats'],
      message: '{VALUE}: is not a valid type!'
    }
  },
  gender: {
    type: String,
    enum: {
      values: ['men', 'women', 'kid', 'unisex'],
      message: '{VALUE}: is not a valid gender!'
    }
  },
}, {
  timestamps: true,
});

// TODO: Create Index

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;