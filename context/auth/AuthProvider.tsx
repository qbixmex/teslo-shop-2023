import { FC, ReactNode, useReducer } from 'react';
import Cookie from 'js-cookie';
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
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  const loginUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await tesloAPI.post<Auth>('users/login', { email, password });
      const { token, user } = data;
      Cookie.set('token', token);
      dispatch({ type: 'Auth - Login', payload: { user } });
      return true;
    } catch (error) {
      return false;
    }
  }

  return (
    <AuthContext.Provider value={{
      ...state,
      // Methods
      loginUser,
    }}>
      { children }
    </AuthContext.Provider>
  );
};