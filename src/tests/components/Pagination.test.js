import React from 'react';
import { shallow } from 'enzyme';
import Pagination from '../../components/Pagination';

let jumpToPage;

beforeEach(() => {
  jumpToPage = jest.fn();
});

test('should correctly render Pagination with both Previous and Next buttons', () => {
  const wrapper = shallow(<Pagination jumpToPage={jumpToPage} currentPage={5} maxPage={40}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should call jumpToPage prop with arg 2 for button 2 click', () => {
  const wrapper = shallow(<Pagination jumpToPage={jumpToPage} currentPage={1} maxPage={40} />);
  wrapper.find('button').at(1).simulate('click');
  expect(jumpToPage).toHaveBeenCalledWith(2);
});

test('should call jumpToPage prop with arg 39 for button 39 click', () => {
  const wrapper = shallow(<Pagination jumpToPage={jumpToPage} currentPage={40} maxPage={40} />);
  wrapper.find('button').at(6).simulate('click');
  expect(jumpToPage).toHaveBeenCalledWith(39);
});

test('should call jumpToPage prop with arg 6 for button Next click', () => {
  const wrapper = shallow(<Pagination jumpToPage={jumpToPage} currentPage={1} maxPage={40} />);
  wrapper.find('button').at(6).simulate('click');
  expect(jumpToPage).toHaveBeenCalledWith(6);
});

test('should call jumpToPage prop with arg 35 for button Previous click', () => {
  const wrapper = shallow(<Pagination jumpToPage={jumpToPage} currentPage={40} maxPage={40} />);
  wrapper.find('button').at(1).simulate('click');
  expect(jumpToPage).toHaveBeenCalledWith(35);
});