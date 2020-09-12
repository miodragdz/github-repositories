import React from "react";
import ReactDOM from "react-dom";
import configureStore from "./store/configureStore";
import "./styles/styles.scss";
import App from "./App";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>,
  document.getElementById("root")
);
