import { CartState } from './';
import { ICartProduct } from '../../interfaces/cart';

type CartActionType =
  | {
      type: 'Cart - Load Cart from Cookies | storage',
      payload: {
        products: ICartProduct[],
      },
    }
  | {
    type: 'Cart - Update products in cart',
    payload: {
      products: ICartProduct[],
    },
  };

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
  switch(action.type) {
    case 'Cart - Load Cart from Cookies | storage':
      return {
        ...state,
        cart: action.payload.products,
      };
    case 'Cart - Update products in cart':
      return {
        ...state,
        cart: [
          ...action.payload.products,
        ],
      };
    default:
      return state;
  }
};
