import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import SideNav from '../SideNav';

test('matches snapshot', () => {
	const wrapper = shallow(<SideNav />);
	expect(toJSON(wrapper)).toMatchSnapshot();
});
