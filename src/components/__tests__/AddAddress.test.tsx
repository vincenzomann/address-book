import React from 'react';
import AddAddress from '../AddAddress';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';

it('renders correctly', () => {
	render(<AddAddress />);
	const component = screen.queryByTestId('addAddress');
	expect(component).toBeInTheDocument();
});
