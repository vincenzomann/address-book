import React from 'react';
import { shallow } from 'enzyme';
import AddAddress from '../AddAddress';

test('renders the component', () => {
	const component = shallow(<AddAddress />);
	expect(component).toMatchSnapshot();
});
