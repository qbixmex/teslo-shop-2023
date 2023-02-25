import { FC, ReactNode, useReducer } from 'react';
import { UIContext, uiReducer } from './';

export type UIState = {
  isMenuOpen: boolean;
};

const UI_INITIAL_STATE: UIState = {
  isMenuOpen: false,
};

export const UIProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toggleSideMenu = () => dispatch({ type: 'UI - Toggle Menu' });

  return (
    <UIContext.Provider value={{
      ...state,
      // Methods
      toggleSideMenu,
    }}>
      { children }
    </UIContext.Provider>
  );
};