import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../src/Pages/App';

Enzyme.configure({ adapter: new Adapter() });

test('App renders successfully', () => {
  const app = shallow(<App />);
  expect(app).toBeDefined();
});