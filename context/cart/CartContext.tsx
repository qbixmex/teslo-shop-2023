import { createContext } from 'react';
import {
  ICartProduct,
  ICartSummary,
  ShippingAddress
} from '../../interfaces';

type ContextProps = {
  isLoaded:  boolean;
  cart: ICartProduct[];
  cartSummary: ICartSummary;
  shippingAddress?: ShippingAddress;
  // Methods
  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeCartProduct: (product: ICartProduct) => void;
  updateAddress: (address: ShippingAddress) => void;
  // Orders
  createOrder: () => Promise<void>;
};

export const CartContext = createContext({} as ContextProps);
