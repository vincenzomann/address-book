import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import AddressBook from '../AddressBook';

test('matches snapshot', () => {
	const wrapper = shallow(<AddressBook />);
	expect(toJSON(wrapper)).toMatchSnapshot();
});
