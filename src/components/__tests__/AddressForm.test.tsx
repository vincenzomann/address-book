import React from 'react';
import '@testing-library/jest-dom';
import { mount, ReactWrapper } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { act } from 'react-dom/test-utils';
// 'act' Allows to work with state changes within component within context of enzyme

jest.mock('../../helpers/fetchAddress', () => {
	return {
		__esModule: true,
		default: async () => [
			{
				id: 1,
				postcode: 'ss1 2tw'
			}
		]
	};
});

test('matches snapshot', async () => {
	// Import component here so it uses mock function
	const AddressForm = require('../AddressBook').default;

	let wrapper: any;
	await act(async () => {
		// Act doesn't work with react v17
		wrapper = mount(<AddressForm />);
	});

	wrapper.update(); // Updates state changes

	expect(toJSON(wrapper)).toMatchSnapshot();
});
