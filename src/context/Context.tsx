import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { Address } from '../types';
import { Response } from './../types';

interface ContextType {
	addresses: Address[],
	setAddresses: Dispatch<SetStateAction<Address[]>>;
	selected: Address,
	setSelected: Dispatch<SetStateAction<Address>>;
	results: Response,
	setResults: React.Dispatch<React.SetStateAction<Response>>;
}

const initialState = {
	addresses: [],
	setAddresses: () => [],
	selected: {
		id: '',
		postcode: '',
		line1: '',
		line2: '',
		line3: '',
		town: '',
		country: ''
	},
	setSelected: () => { },
	results: {
		postcode: '',
		latitude: 0,
		longitude: 0,
		addresses: []
	},
	setResults: () => { }
};

const Context = createContext<ContextType>(initialState);

export function useContextProvider() {
	return useContext(Context);
}

const ContextProvider: React.FC = ({ children }) => {

	// Central state that can be accessed across components
	const [addresses, setAddresses] = useState<Address[]>([]);
	const [selected, setSelected] = useState<Address>({
		id: '',
		postcode: '',
		line1: '',
		line2: '',
		line3: '',
		town: '',
		country: ''
	});
	const [results, setResults] = useState<Response>({
		postcode: '',
		latitude: 0,
		longitude: 0,
		addresses: []
	});

	const values = {
		addresses,
		setAddresses,
		selected,
		setSelected,
		results,
		setResults
	};

	return (
		<Context.Provider value={values}>
			{children}
		</Context.Provider>
	);
};

export default ContextProvider;
