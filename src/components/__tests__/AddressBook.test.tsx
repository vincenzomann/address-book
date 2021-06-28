import React from 'react';
import AddressBook from '../AddressBook';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';

it('renders correctly', () => {
	render(<AddressBook />);
	const component = screen.queryByTestId('addressBook');
	expect(component).toBeInTheDocument();
});
