import axios from "axios";
import { apiRepositories } from "../utils/apiRoutes";

const setRepositories = (repositories) => ({
  type: "SET_REPOSITORIES",
  payload: repositories,
});

const getRepositories = (dispatch, searchTerm, pageNumber) => {
  return axios.get(apiRepositories(searchTerm, pageNumber)).then(({ data }) => {
    dispatch(setRepositories(data));
    return data;
  });
};

const actionFunctions = {
  setRepositories,
  getRepositories,
};

export default actionFunctions;
