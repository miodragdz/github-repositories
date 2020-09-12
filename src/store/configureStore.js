import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import repositoriesReducer from "../reducers/repositoriesReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      repositories: repositoriesReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
