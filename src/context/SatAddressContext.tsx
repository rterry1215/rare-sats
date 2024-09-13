import React, { createContext, useContext, useState } from 'react';

interface SatAddressContextType {
  satAddress: string;
  setSatAddress: React.Dispatch<React.SetStateAction<string>>;
}

const SatAddressContext = createContext<SatAddressContextType | undefined>(undefined);

export const SatAddressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [satAddress, setSatAddress] = useState<string>("");

  return (
    <SatAddressContext.Provider value={{ satAddress, setSatAddress }}>
      {children}
    </SatAddressContext.Provider>
  );
};

export const useSatAddress = () => {
  const context = useContext(SatAddressContext);
  if (!context) {
    throw new Error("useSatAddress must be used within a SatAddressProvider");
  }
  return context;
};
