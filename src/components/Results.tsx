import React from 'react';
import { useContextProvider } from '../context/Context';
import { Address, Response } from './../types';
import AddressInfo from './AddressInfo';

interface Props {
	results: Response;
	setError: React.Dispatch<React.SetStateAction<string>>;
	setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const Results: React.FC<Props> = ({ setError, setMessage }) => {

	const { addresses, setAddresses, results } = useContextProvider();

	const handleAdd = (address: Address) => {
		setError('');
		setMessage('');
		// Check if the address is already in the address book
		if (addresses.findIndex((stateAddress) => {
			return stateAddress.id === address.id;
		}) !== -1) {
			return setError('Address already added');
		}
		setAddresses((prevState) => {
			return [...prevState, address];
		});
	};

	return (
		<div>
			{results.postcode && <h2>Results</h2>}
			{results.addresses.map((data) => {
				const address: Address = {
					id: data.line_1 + results.postcode,
					postcode: results.postcode,
					line1: data.line_1,
					line2: data.line_2,
					line3: data.line_3,
					town: data.town_or_city,
					country: data.country,
				};
				return (
					// If the card id exists in the state, show it has been added className style
					<div
						className={`card result 
								${(addresses.findIndex((stateAddress) => {
							return stateAddress.id === address.id;
						}) !== -1) && 'added'}
							`}
						key={address.id}
						onClick={() => handleAdd(address)}
					>
						<AddressInfo address={address} />
					</div>
				);
			})}
		</div>
	);
};

export default Results;
