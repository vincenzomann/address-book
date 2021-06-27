import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { useContextProvider } from './../context/Context';
import { Address } from '../types';
import './sass/AddressBook.scss';

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
				<p id='selectedAddress'>
					Selected Address:
					<div>
						{selected.line1 && <p>{selected.line1}</p>}
						{selected.line2 && <p>{selected.line2}</p>}
						{selected.line3 && <p>{selected.line3}</p>}
						{selected.postcode && <p>{selected.postcode}</p>}
						{selected.town && <p>{selected.town}</p>}
						{selected.country && <p>{selected.country}</p>}
					</div>
				</p>
			}
			<div id='addresses'>
				{addresses.length ? addresses.map((address) => (
					// If the card id matches the selected id, add styling to the card border
					<div className={`card address ${(address.id === selected?.id) && 'selected'} `} key={address.id}
						onClick={() => setSelected(address)}
					>
						{address.line1 && <p>{address.line1}</p>}
						{address.line2 && <p>{address.line2}</p>}
						{address.line3 && <p>{address.line3}</p>}
						{address.postcode && <p>{address.postcode}</p>}
						{address.town && <p>{address.town}</p>}
						{address.country && <p>{address.country}</p>}
					</div>
				)) : <div>Go to the "Add Address" page to fill your address book</div>}
			</div>
		</div>
	);
};

export default AddressBook;
