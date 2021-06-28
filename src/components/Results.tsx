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

	const { addresses, setAddresses, results, selected, setSelected } = useContextProvider();

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

	const classNames = (address: Address) => {
		// If the card id exists in the state, show it has been added className style
		// If the card id matches the selected id, add styling to the card border
		let classNames = [];
		if (addresses.findIndex((stateAddress) => stateAddress.id === address.id) !== -1) {
			classNames.push('added');
		}
		if (address.id === selected.id) {
			classNames.push('selected');
		}
		console.log(classNames);
		return classNames.join(' ');
	};

	return (
		<div>
			{results.postcode && <h2>Results</h2>}
			{results.addresses.map((data) => {
				const address: Address = {
					id: results.postcode + data.line_1 + data.line_2 + data.line_3,
					postcode: results.postcode,
					line1: data.line_1,
					line2: data.line_2,
					line3: data.line_3,
					town: data.town_or_city,
					country: data.country,
				};
				return (
					<div
						className={`card result ${classNames(address)}`}
						key={address.id}
						onClick={() => {
							handleAdd(address);
							setSelected(address);
						}}
					>
						<AddressInfo address={address} />
					</div>
				);
			})}
		</div>
	);
};

export default Results;
