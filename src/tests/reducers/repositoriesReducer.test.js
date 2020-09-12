import repositoriesReducer from "../../reducers/repositoriesReducer";
import repositories from "../fixtures/repositories";

test("should set default state", () => {
  const state = repositoriesReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual({});
});

test("should set repositories", () => {
  const action = {
    type: "SET_REPOSITORIES",
    payload: repositories,
  };
  const state = repositoriesReducer({}, action);
  expect(state).toEqual(repositories);
});
