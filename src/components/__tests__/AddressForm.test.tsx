import React from 'react';
import AddressForm, { Props } from '../AddressForm';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

function renderForm(props: Partial<Props> = {}) {
	const defaultProps: Props = {
		setResults() {
			return;
		},
		error: '',
		setError() {
			return;
		},
		message: '',
		setMessage() {
			return;
		},
		mode: 'search',
		setMode() {
			return;
		}
	};
	return render(<AddressForm {...defaultProps} {...props} />);
}

it('renders correctly', () => {
	renderForm();
	const component = screen.queryByTestId('addressForm');
	expect(component).toBeInTheDocument();
});

it('displays blank form', async () => {
	renderForm();

	const form = await screen.findByTestId('form');

	expect(form).toHaveFormValues({
		postcode: '',
		houseNumber: ''
	});
});

it('should allow entering a postcode', async () => {
	renderForm();
	const postcode = await screen.findByTestId('postcode');
	fireEvent.change(postcode, { target: { value: 'test' } });
	expect(postcode).toHaveValue('test');
});
