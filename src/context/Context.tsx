import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { Address } from '../types';

interface ContextType {
	addresses: Address[],
	setAddresses: Dispatch<SetStateAction<Address[]>>;
}

const initialState = {
	addresses: [],
	setAddresses: () => []
};

const Context = createContext<ContextType>(initialState);

export function useContextProvider() {
	return useContext(Context);
}

const ContextProvider: React.FC = ({ children }) => {

	const [addresses, setAddresses] = useState<Address[]>([]);

	const values = {
		addresses,
		setAddresses
	};

	return (
		<Context.Provider value={values}>
			{children}
		</Context.Provider>
	);
};

export default ContextProvider;
