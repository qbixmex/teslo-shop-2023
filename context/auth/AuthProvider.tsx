import {
  FC, ReactNode, useReducer, useEffect, useRef
} from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';
import axios from 'axios';

import { IUser } from '../../interfaces';
import { AuthContext, authReducer } from './';
import tesloAPI from '../../api/tesloAPI';

export type AuthState = {
  isLoggedIn: boolean;
  user?: IUser;
};

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

type Auth = { token: string; user: IUser };

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [ state, dispatch ] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const { data, status } = useSession();
  const router = useRouter();
  const mount = useRef(false);

  useEffect(() => {
    if (mount.current === true && status === 'authenticated') {
      dispatch({ type: 'Auth - Login', payload: { user: data?.user as IUser } });
    }
    return () => {
      mount.current = true;
    };
  }, [ status, data ]);
  
  const loginUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await tesloAPI.post<Auth>('/users/login', { email, password });
      const { token, user } = data;
      Cookie.set('token', token);
      dispatch({ type: 'Auth - Login', payload: { user } });
      return true;
    } catch (error) {
      return false;
    }
  };

  const logoutUser = (): void => {
    Cookie.remove('cart');
    Cookie.remove('address');
    // Next SignOut
    signOut();
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<{
    hasError: boolean;
    message?: string;
  }> => {
    try {
      const { data } = await tesloAPI.post<Auth>('users/register', { name, email, password });
      const { token, user } = data;
      Cookie.set('token', token);
      dispatch({ type: 'Auth - Login', payload: { user } });
      return { hasError: false };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message
        };
      }
      return {
        hasError: true,
        message: 'Cannot create a new user!'
      }
    }
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      // Methods
      loginUser,
      registerUser,
      logoutUser,
    }}>
      { children }
    </AuthContext.Provider>
  );
};