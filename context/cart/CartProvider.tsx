import { FC, ReactNode, useReducer, useEffect, useState } from 'react';
import Cookie from 'js-cookie';
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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) {
      try {
        const productsInCart = JSON.parse(Cookie.get('cart') ?? '[]');
        dispatch({
          type: 'Cart - Load Cart from Cookies | storage',
          payload: { products: productsInCart }
        });
        setIsMounted(true);
      } catch (error) {
        dispatch({
          type: 'Cart - Load Cart from Cookies | storage',
          payload: { products: [] }
        });
      }
    }
  }, [isMounted]);

  useEffect(() => {
    if (isMounted) {
      Cookie.set('cart', JSON.stringify(state.cart));
    }
  }, [state.cart, isMounted]);

  useEffect(() => {
    const numberOfItems = state.cart.reduce((prevQuantity, currentProduct) => {
      return prevQuantity + currentProduct.quantity;
    }, 0);

    const subtotal = state.cart.reduce((prevSubTotal, currentProduct) => {
      return prevSubTotal + (currentProduct.price * currentProduct.quantity);
    }, 0);

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE ?? 0);

    const orderSummary = {
      numberOfItems,
      subtotal,
      tax: subtotal * taxRate,
      total: subtotal * (1 + taxRate),
    };

    console.table(orderSummary);
  }, [state.cart]);

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

  const updateCartQuantity = (product: ICartProduct) => {
    dispatch({ type: 'Cart - Change cart quantity', payload: { product } });
  };

  const removeCartProduct = (product: ICartProduct) => {
    dispatch({ type: 'Cart - Remove product in cart', payload: { product } });
  };

  return (
    <CartContext.Provider value={{
      ...state,
      // Methods
      addProductToCart,
      updateCartQuantity,
      removeCartProduct,
    }}>
      { children }
    </CartContext.Provider>
  );
};
