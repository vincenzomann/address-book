import React from 'react';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Results, { Props } from '../Results';
import '@testing-library/jest-dom';

function renderResults(props: Partial<Props> = {}) {
	const defaultProps: Props = {
		setError() {
			return;
		},
		setMessage() {
			return;
		}
	};
	return render(<Results {...defaultProps} {...props} />);
}

it('renders correctly', () => {
	renderResults();
	const component = screen.queryByTestId('results');
	expect(component).toBeInTheDocument();
});


