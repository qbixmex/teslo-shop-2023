import { createContext } from 'react';
import { ICartProduct, ICartSummary } from '../../interfaces';

type ContextProps = {
  cart: ICartProduct[];
  cartSummary: ICartSummary;
  // Methods
  addProductToCart: (product: ICartProduct) => void;
  updateCartQuantity: (product: ICartProduct) => void;
  removeCartProduct: (product: ICartProduct) => void;
};

export const CartContext = createContext({} as ContextProps);