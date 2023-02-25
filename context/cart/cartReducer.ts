import { CartState } from './';
import { ICartProduct } from '../../interfaces/cart';

type CartActionType =
  | {
      type: 'Cart - Load Cart from Cookies | storage',
      payload: ICartProduct[]
    }
  | { type: 'Cart - Add Product', payload: ICartProduct };

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
  switch(action.type) {
    case 'Cart - Load Cart from Cookies | storage':
      return {
        ...state,
        // TODO: Implementation
      };
    case 'Cart - Add Product':
      return {
        ...state,
        // TODO: Implementation
      };
    default:
      return state;
  }
};
