import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import AddAddress from '../AddAddress';

test('matches snapshot', () => {
	const wrapper = shallow(<AddAddress />);
	expect(toJSON(wrapper)).toMatchSnapshot();
});
