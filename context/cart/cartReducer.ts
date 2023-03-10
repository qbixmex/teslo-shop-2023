import { CartState } from './';
import { ICartProduct, ICartSummary, ShippingAddress } from '../../interfaces';

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
  }
  | {
    type: 'Cart - Update order summary',
    payload: { cartSummary: ICartSummary },
  }
  | {
    type: 'Cart - Load address from cookies',
    payload: { shippingAddress: ShippingAddress | undefined },
  }
  | {
    type: 'Cart - Update Shipping Address',
    payload: { shippingAddress: ShippingAddress },
  }
  | { type: 'Cart - Order Complete' };

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
  switch(action.type) {
    case 'Cart - Load Cart from Cookies | storage':
      return {
        ...state,
        isLoaded: true,
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
        cart: state.cart.filter(product => !(
            product._id === action.payload.product._id &&
            product.size === action.payload.product.size
          )
        )
      };
    case 'Cart - Update order summary':
      return {
        ...state,
        cartSummary: action.payload.cartSummary
      };
    case 'Cart - Update Shipping Address':
    case 'Cart - Load address from cookies':
      return {
        ...state,
        shippingAddress: action.payload.shippingAddress
      };
    case 'Cart - Order Complete':
      return {
        ...state,
        cart: [],
        cartSummary: {
          numberOfItems: 0,
          subtotal: 0,
          tax: 0,
          total: 0,
        },
      };
    default:
      return state;
  }
};
