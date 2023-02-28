import { CartState } from './';
import { ICartProduct } from '../../interfaces/cart';

type CartActionType =
  | {
      type: 'Cart - Load Cart from Cookies | storage',
      payload: { products: ICartProduct[] },
    }
  | {
    type: 'Cart - Update products in cart',
    payload: { products: ICartProduct[] },
  }
  | {
    type: 'Cart - Change cart quantity',
    payload: { product: ICartProduct },
  }
  | {
    type: 'Cart - Remove product in cart',
    payload: { product: ICartProduct },
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
    case 'Cart - Change cart quantity':
      return {
        ...state,
        cart: state.cart.map(product => {
          if (product._id !== action.payload.product._id) return product;
          if (product.size !== action.payload.product.size) return product;
          // Update Product
          product.quantity = action.payload.product.quantity;
          return product;
        }),
      };
    case 'Cart - Remove product in cart':
      return {
        ...state,
        //? ALTERNATIVE
        //? cart: state.cart.filter(product => {
        //?   return (
        //?     product._id === action.payload.product._id &&
        //?     product.size === action.payload.product.size
        //?   ) ? false : true;
        //? })

        cart: state.cart.filter(product => !(
            product._id === action.payload.product._id &&
            product.size === action.payload.product.size
          )
        )
      };
    default:
      return state;
  }
};
