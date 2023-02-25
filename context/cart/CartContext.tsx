import { createContext } from 'react';
import { ICartProduct } from '../../interfaces';

type ContextProps = {
  cart: ICartProduct[];
};

export const CartContext = createContext({} as ContextProps);
