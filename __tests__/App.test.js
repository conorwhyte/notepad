import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from '../src/Pages/Home';

Enzyme.configure({ adapter: new Adapter() });

test('App renders successfully', () => {
  const app = shallow(<Home />);
  expect(app).toBeDefined();
});

test('App renders with nav and editor', () => {
  const app = shallow(<Home />);
  expect(app.find('.navbar')).toBeDefined();
  expect(app.find('.Editor')).toBeDefined();
});