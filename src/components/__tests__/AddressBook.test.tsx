import React from 'react';
import { shallow } from 'enzyme';
import AddressBook from '../AddressBook';

test('renders the component', () => {
	const component = shallow(<AddressBook />);
	expect(component).toMatchSnapshot();
});
