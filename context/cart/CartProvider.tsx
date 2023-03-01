import { FC, ReactNode, useReducer, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { CartContext, cartReducer } from './';
import { ICartProduct, ICartSummary, ShippingAddress } from '../../interfaces';

export type CartState = {
  isLoaded: boolean;
  cart: ICartProduct[];
  cartSummary: ICartSummary;
  shippingAddress?: ShippingAddress;
};

const CART_INITIAL_STATE: CartState = {
  isLoaded: false,
  cart: [],
  cartSummary: {
    numberOfItems: 0,
    subtotal: 0,
    tax: 0,
    total: 0,
  },
  shippingAddress: undefined,
};

export const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) {
      try {
        const productsInCart = JSON.parse(Cookies.get('cart') ?? '[]');
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
    if (Cookies.get('address')) {
      const shippingAddress = JSON.parse(Cookies.get('address')!) as ShippingAddress;
      dispatch({
        type: 'Cart - Load address from cookies',
        payload: { shippingAddress }
      });
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      Cookies.set('cart', JSON.stringify(state.cart));
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

    dispatch({
      type: 'Cart - Update order summary',
      payload: {
        cartSummary: {
          numberOfItems,
          subtotal,
          tax: subtotal * taxRate,
          total: subtotal * (1 + taxRate),
        }
      }
    });
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

  const updateAddress = (shippingAddress: ShippingAddress) => {
    Cookies.set('address', JSON.stringify(shippingAddress));
    dispatch({
      type: 'Cart - Update Shipping Address',
      payload: { shippingAddress }
    });
  };

  return (
    <CartContext.Provider value={{
      ...state,
      // Methods
      addProductToCart,
      updateCartQuantity,
      removeCartProduct,
      updateAddress,
    }}>
      { children }
    </CartContext.Provider>
  );
};
