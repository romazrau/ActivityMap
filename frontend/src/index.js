import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./js/redux/store/index";
import App from ".//js/components/App.jsx"; //redux 範例

import * as serviceWorker from './serviceWorker';

render(
  <Provider store={store}>
    <App ></App>
  </Provider>,

  document.getElementById("root")
);


serviceWorker.unregister();
