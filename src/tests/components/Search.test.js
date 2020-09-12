import React from "react";
import { shallow } from "enzyme";
import Search from "../../components/Search";

let onSearchButtonClick, wrapper;

beforeEach(() => {
  onSearchButtonClick = jest.fn();
  wrapper = shallow(<Search onSearchButtonClick={onSearchButtonClick} />);
});

test("should correctly render Search", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should set searchTerm on input change", () => {
  const value = "New searchTerm value";
  wrapper.find("input").simulate("change", {
    target: { value },
  });
  expect(wrapper.state("searchTerm")).toBe(value);
});

test("should call onSearchButtonClick prop for form submission", () => {
  wrapper.find("button").simulate("click", {
    preventDefault: () => {},
  });
  expect(onSearchButtonClick).toHaveBeenCalledWith(wrapper.state("searchTerm"));
});
