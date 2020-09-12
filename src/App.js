import React from "react";
import { Provider } from "react-redux";

import RepositoriesPage from "./components/RepositoriesPage";

const App = ({ store }) => {
  return (
    <Provider store={store}>
      <RepositoriesPage />
    </Provider>
  );
};

export default App;
