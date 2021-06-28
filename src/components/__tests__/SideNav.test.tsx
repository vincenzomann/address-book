import React from 'react';
import SideNav from '../SideNav';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';

it('renders correctly', () => {
	render(<SideNav />);
	const component = screen.queryByTestId('sideNav');
	expect(component).toBeInTheDocument();
});
