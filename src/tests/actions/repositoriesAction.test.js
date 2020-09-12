import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import actionFunctions from "../../actions/repositoriesAction";
import { repositories, data } from "../fixtures/repositories";

const { setRepositories, getRepositories } = actionFunctions;
const defaultState = {};
const createMockStore = configureMockStore([thunk]);
jest.mock("axios");

test("should setup set repositories action object with data", () => {
  const action = setRepositories(repositories);
  expect(action).toEqual({
    type: "SET_REPOSITORIES",
    payload: repositories,
  });
});

test("should add repositories to store", () => {
  const store = createMockStore(defaultState);
  const p = () =>
    new Promise(() => store.dispatch(setRepositories(repositories)));

  p().then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "SET_REPOSITORIES",
      payload: repositories,
    });
  });
});

describe("getRepositories", () => {
  test("fetches successfully data from an API", async () => {
    const store = createMockStore(defaultState);
    const mockedData = { data };
    axios.get.mockImplementationOnce(() => Promise.resolve(mockedData));

    await expect(getRepositories(store.dispatch, "zvre", 1)).resolves.toEqual(
      mockedData.data
    );

    expect(axios.get).toHaveBeenCalledWith(
      `https://api.github.com/search/repositories?q=zvre+in:name&page=1&per_page=25&sort=stars&order=desc`
    );
  });

  test("fetches erroneously data from an API", async () => {
    const store = createMockStore(defaultState);
    const errorMessage = "Network Error";

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );

    await expect(getRepositories(store.dispatch, "zvre", 1)).rejects.toThrow(
      errorMessage
    );
  });
});
