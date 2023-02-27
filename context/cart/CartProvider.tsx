import { FC, ReactNode, useReducer } from 'react';
import { CartContext, cartReducer } from './';
import { ICartProduct } from '../../interfaces';

export type CartState = {
  cart: ICartProduct[];
};

const CART_INITIAL_STATE: CartState = {
  cart: [],
};

export const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  const addProductToCart = (product: ICartProduct) => {
    const productInCart = state.cart.some(p => p._id === product._id);
    const productInCartButDifferentSize = state.cart.some(p => {
      return (p._id === product._id) && (p.size === product.size);
    });

    if (!productInCart) {
      return dispatch({
        type: 'Cart - Update products in cart',
        payload: {
          products: [ ...state.cart, product ],
        },
      });
    }

    if (!productInCartButDifferentSize) {
      return dispatch({
        type: 'Cart - Update products in cart',
        payload: {
          products: [ ...state.cart, product ],
        },
      });
    }

    //* Accumulate Quantity
    const updatedProducts = state.cart.map(p => {
      if (p._id !== product._id) return p;
      if (p.size !== product.size) return p;
      
      //* Update Quantity
      p.quantity += product.quantity;
      return p;
    });

    return dispatch({
      type: 'Cart - Update products in cart',
      payload: { products: updatedProducts },
    });
  };

  return (
    <CartContext.Provider value={{
      ...state,
      // Methods
      addProductToCart,
    }}>
      { children }
    </CartContext.Provider>
  );
};
