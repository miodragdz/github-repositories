import axios from 'axios';
import { apiRepositories } from '../utils/apiRoutes';

export const setRepositories = (repositories) => ({
  type: 'SET_REPOSITORIES',
  payload: repositories,
});

export const getRepositories = (dispatch, searchTerm, pageNumber) => {
  return axios.get(apiRepositories(searchTerm, pageNumber)).then(({ data }) => {
    dispatch(setRepositories(data));
    return data
  });
};
