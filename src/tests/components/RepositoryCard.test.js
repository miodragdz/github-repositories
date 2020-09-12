import React from 'react';
import { shallow } from 'enzyme';
import RepositoryCard from '../../components/RepositoryCard';
import { repositories } from '../fixtures/repositories';

test('should correctly render RepositoryCard with language info', () => {
  const wrapper = shallow(<RepositoryCard key={repositories.items[0].id} repository={repositories.items[0]}/>);
  expect(wrapper).toMatchSnapshot();
});

test('should correctly render RepositoryCard without language info', () => {
  const wrapper = shallow(<RepositoryCard key={repositories.items[1].id} repository={repositories.items[1]}/>);
  expect(wrapper).toMatchSnapshot();
});
