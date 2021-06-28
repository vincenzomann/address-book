import React from 'react';
import App from './App';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';

it('renders correctly', () => {
	render(<App />);
	const component = screen.queryByTestId('app');
	expect(component).toBeInTheDocument();
});
