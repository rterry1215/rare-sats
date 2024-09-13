import React, { createContext, useContext, useState, ReactNode } from 'react';
import { getProviders, setDefaultProvider, getAddress } from '@sats-connect/core';
import Wallet, { AddressPurpose, BitcoinNetworkType } from 'sats-connect';
import { toast } from 'sonner';

interface AuthContextType {
    walletType: string;
    paymentAddress: string;
    paymentAddressPublicKey: string;
    ordinalAddress: string;
    ordinalAddressPublicKey: string;
    isLoggedIn: boolean;
    isSearchActive: boolean;
    signOut: () => void;
    connectWallet: (type: string) => Promise<void>;
    setIsSearchActive: (data: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [walletType, setWalletType] = useState<string>(localStorage.getItem('walletType') || '');
    const [paymentAddress, setPaymentAddress] = useState<string>(localStorage.getItem('paymentAddress') || '');
    const [paymentAddressPublicKey, setPaymentAddressPublicKey] = useState<string>(localStorage.getItem('paymentAddressPublicKey') || '');
    const [ordinalAddress, setOrdinalAddress] = useState<string>(localStorage.getItem('ordinalAddress') || '');
    const [ordinalAddressPublicKey, setOrdinalAddressPublicKey] = useState<string>(localStorage.getItem('ordinalAddressPublicKey') || '');
    const [isSearchActive, setIsSearchActive] = useState(false);

    const isLoggedIn = [walletType, paymentAddress, paymentAddressPublicKey, ordinalAddress, ordinalAddressPublicKey].every(value => value !== '');
    const signOut = (): void => {
        resetState();
        clearLocalStorage();
    };
    console.log('ordi',ordinalAddress);
    console.log('pay',paymentAddress);

    const connectWallet = async (walletType: string): Promise<void> => {
        try {
            switch (walletType) {
                case 'Unisat':
                    await connectUnisatWallet();
                    break;
                case 'MagicEden':
                    await connectMagicEdenWallet();
                    break;
                default:
                    await connectOtherWallet(walletType);
                    break;
            }
            setIsSearchActive(true);
        } catch (err: any) {
            console.error('connectWallet:', err);
            toast.error(`Install ${walletType} Wallet`);
        }
    };

    const connectUnisatWallet = async (): Promise<void> => {
        const unisat = (window as any).unisat;
        await ensureCorrectNetwork(unisat);
        const addresses = await unisat.requestAccounts();
        const publicKey = await unisat.getPublicKey();

        updateStorageAndState('Unisat', addresses[0], publicKey, addresses[0], publicKey);
    };

    const connectMagicEdenWallet = async (): Promise<void> => {
        const magicEden = (window as any).magicEden?.bitcoin;
        if (!magicEden) {
            toast.error('Install MagicEden wallet');
            return;
        }

        const options: any = getAddressOptions('MagicEden');
        options.getProvider = async () => magicEden;

        await getAddress(options);
    };

    const connectOtherWallet = async (walletType: string): Promise<void> => {
        const providers = getProviders();
        const isXverse = providers.some(
            (provider) => provider.id === 'XverseProviders.BitcoinProvider'
        );

        if (isXverse) {
            setDefaultProvider('XverseProviders.BitcoinProvider');
            const res = await Wallet.request('getAccounts', {
                purposes: [AddressPurpose.Payment, AddressPurpose.Ordinals],
            });

            if (res.status === 'error') {
                toast.error(res.error.message);
                return;
            }

            handleAddressResponse(walletType, res.result);
        } else {
            toast.error(`Install ${walletType} Wallet`);
        }
    };

    const ensureCorrectNetwork = async (unisat: any): Promise<void> => {
        const currentNetwork = await unisat.getNetwork();
        const desiredNetwork = process.env.REACT_APP_NETWORK === 'testnet' ? 'testnet' : 'livenet';

        if (currentNetwork !== desiredNetwork) {
            await unisat.switchNetwork(desiredNetwork);
        }
    };

    const getAddressOptions = (walletType: string) => {
        const networkType = process.env.REACT_APP_NETWORK === 'testnet'
            ? BitcoinNetworkType.Testnet
            : BitcoinNetworkType.Mainnet;

        return {
            payload: {
                purposes: [AddressPurpose.Ordinals, AddressPurpose.Payment],
                message: 'Address for receiving Ordinals and payments',
                network: { type: networkType },
            },
            onFinish: (response: any) => handleAddressResponse(walletType, response.addresses),
        };
    };

    const handleAddressResponse = (
        walletType: string,
        addresses: Array<{ purpose: string, address: string, publicKey: string }>
    ): void => {
        if (!addresses) return;

        const getAddress = (purpose: string) => {
            const addr = addresses.find((addr) => addr.purpose === purpose);
            return addr ? addr.address : '';
        };

        const getPublicKey = (purpose: string) => {
            const addr = addresses.find((addr) => addr.purpose === purpose);
            return addr ? addr.publicKey : '';
        };

        const paymentAddress = getAddress('payment');
        const ordinalAddress = getAddress('ordinals');
        const paymentAddressPublicKey = getPublicKey('payment');
        const ordinalAddressPublicKey = getPublicKey('ordinals');

        updateStorageAndState(
            walletType,
            paymentAddress,
            paymentAddressPublicKey,
            ordinalAddress,
            ordinalAddressPublicKey
        );
    };

    const updateStorageAndState = (
        walletType: string,
        paymentAddress: string,
        paymentAddressPublicKey: string,
        ordinalAddress: string,
        ordinalAddressPublicKey: string
    ): void => {
        updateLocalStorage(
            walletType,
            paymentAddress,
            paymentAddressPublicKey,
            ordinalAddress,
            ordinalAddressPublicKey
        );
        updateState(
            walletType,
            paymentAddress,
            paymentAddressPublicKey,
            ordinalAddress,
            ordinalAddressPublicKey
        );
    };

    const updateLocalStorage = (
        walletType: string,
        paymentAddress: string,
        ordinalAddress: string,
        paymentAddressPublicKey: string,
        ordinalAddressPublicKey: string
    ): void => {
        localStorage.setItem('walletType', walletType);
        localStorage.setItem('paymentAddress', paymentAddress);
        localStorage.setItem('ordinalAddress', ordinalAddress);
        localStorage.setItem('paymentAddressPublicKey', paymentAddressPublicKey);
        localStorage.setItem('ordinalAddressPublicKey', ordinalAddressPublicKey);
    };

    const updateState = (
        walletType: string,
        paymentAddress: string,
        paymentAddressPublicKey: string,
        ordinalAddress: string,
        ordinalAddressPublicKey: string
    ): void => {
        setWalletType(walletType);
        setPaymentAddress(paymentAddress);
        setPaymentAddressPublicKey(paymentAddressPublicKey);
        setOrdinalAddress(ordinalAddress);
        setOrdinalAddressPublicKey(ordinalAddressPublicKey);
    };

    const clearLocalStorage = (): void => {
        ['walletType', 'paymentAddress', 'ordinalAddress', 'paymentAddressPublicKey', 'ordinalAddressPublicKey'].forEach((key) => localStorage.removeItem(key));
    };

    const resetState = (): void => {
        setWalletType('');
        setPaymentAddress('');
        setPaymentAddressPublicKey('');
        setOrdinalAddress('');
        setOrdinalAddressPublicKey('');
        setIsSearchActive(false);
    };

    return (
        <AuthContext.Provider value={{ walletType, isSearchActive, paymentAddress, paymentAddressPublicKey, ordinalAddress, ordinalAddressPublicKey, isLoggedIn, setIsSearchActive, signOut, connectWallet }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};