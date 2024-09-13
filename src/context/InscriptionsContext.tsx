import React, { createContext, useContext, useState } from 'react';

interface InscriptionsContextType {
    inscriptions: string[];
    setInscriptions: React.Dispatch<React.SetStateAction<string[]>>;
}

const InscriptionsContext = createContext<InscriptionsContextType | undefined>(undefined);

export const InscriptionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [inscriptions, setInscriptions] = useState<string[]>([]);
    // console.log('ss',inscriptions)
    return (
        <InscriptionsContext.Provider value={{ inscriptions, setInscriptions }}>
            {children}
        </InscriptionsContext.Provider>
    );
};

export const useInscriptions = () => {
    const context = useContext(InscriptionsContext);
    if (!context) {
        throw new Error("useInscriptions must be used within an InscriptionsProvider");
    }
    return context;
};
