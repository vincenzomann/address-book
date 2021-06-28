import React from 'react';
import AddressInfo from '../AddressInfo';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';

it('renders correctly', () => {
	render(<AddressInfo address={mockAddress} />);
	const component = screen.queryByTestId('addressInfo');
	expect(component).toBeInTheDocument();
});

const mockAddress = {
	id: 'ss12tw24',
	postcode: 'ss1 2tw',
	line1: '24',
	line2: '',
	line3: '',
	town: 'Southend',
	country: 'England'
};
