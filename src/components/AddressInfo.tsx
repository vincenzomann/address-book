import React from 'react';
import { Address } from '../types';

interface Props {
	address: Address;
}

const AddressInfo: React.FC<Props> = ({ address }) => {
	return (
		<div data-testid='addressInfo'>
			{address.line1 && <p>{address.line1}</p>}
			{address.line2 && <p>{address.line2}</p>}
			{address.line3 && <p>{address.line3}</p>}
			{address.postcode && <p>{address.postcode}</p>}
			{address.town && <p>{address.town}</p>}
			{address.country && <p>{address.country}</p>}
		</div>
	);
};

export default AddressInfo;
