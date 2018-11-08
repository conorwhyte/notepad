import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from '../src/Pages/Home';

Enzyme.configure({ adapter: new Adapter() });

test('App renders successfully', () => {
  const app = shallow(<Home />);
  expect(app).toBeDefined();
});