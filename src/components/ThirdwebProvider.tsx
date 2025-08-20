"use client";

import { ThirdwebProvider as ThirdwebProviderBase } from "thirdweb/react";

interface ThirdwebProviderProps {
  children: React.ReactNode;
}

export const ThirdwebProvider = ({ children }: ThirdwebProviderProps) => {
  return (
    <ThirdwebProviderBase>
      {children}
    </ThirdwebProviderBase>
  );
};
