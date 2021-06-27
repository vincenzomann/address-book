import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useContextProvider } from './../context/Context';
import { Address } from '../types';
import './sass/AddressBook.scss';
import AddressInfo from './AddressInfo';

interface Props extends RouteComponentProps { }

const AddressBook: React.FC<Props> = () => {

	const { addresses } = useContextProvider();

	const [selected, setSelected] = useState<Address>();

	return (
		<div id='addressBook'>
			<h1 className='pageTitle'>
				Address Book
			</h1>
			{selected &&
				<div id='selectedAddress'>
					Selected Address:
					<AddressInfo address={selected} />
				</div>
			}
			<div id='addresses'>
				{addresses.length ? addresses.map((address) => (
					// If the card id matches the selected id, add styling to the card border
					<div className={`card address ${(address.id === selected?.id) && 'selected'} `} key={address.id}
						onClick={() => setSelected(address)}
					>
						<AddressInfo address={address} />
					</div>
				)) : <div>Go to the "Add Address" page to fill your address book</div>}
			</div>
		</div>
	);
};

export default AddressBook;
