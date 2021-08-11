import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { MainProvider } from "./Context";

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

ReactDOM.render(
    <MainProvider>
      <Router>
        <App />
      </Router>
    </MainProvider>,
  document.getElementById("root")
);
