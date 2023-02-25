import { createContext } from 'react';

type ContextProps = {
  isMenuOpen: boolean;
  // Methods
  toggleSideMenu: () => void;
};

export const UIContext = createContext({} as ContextProps);