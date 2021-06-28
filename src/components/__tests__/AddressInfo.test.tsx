import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import AddressInfo from '../AddressInfo';

const mockAddress = {
	id: 'ss12tw24',
	postcode: 'ss1 2tw',
	line1: '24',
	line2: '',
	line3: '',
	town: 'Southend',
	country: 'England'
};

test('matches snapshot', () => {
	const wrapper = shallow(<AddressInfo address={mockAddress} />);
	expect(toJSON(wrapper)).toMatchSnapshot();
});
