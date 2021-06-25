import React, { createContext, useContext } from 'react';

interface ContextType {

}

const initialState = {

};

const Context = createContext<ContextType>(initialState);

export function useContextProvider() {
	return useContext(Context);
}

const ContextProvider: React.FC = ({ children }) => {

	const values = {

	};

	return (
		<Context.Provider value={values}>
			{children}
		</Context.Provider>
	);
};

export default ContextProvider;
