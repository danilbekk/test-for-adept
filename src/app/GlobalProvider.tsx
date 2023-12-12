import React from 'react';
import { Providers } from '@/storage/redux/provider';

interface GlobalProviderProps {
  children: React.ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  return (
    <React.StrictMode>
      <Providers>
        {children}
      </Providers>
    </React.StrictMode>
  );
};