import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { css, Global } from "@emotion/react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import axios from "axios";

axios.interceptors.request.use(
  (config: any) => {
    const {
      auth: { accessToken },
    } = store.getState();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (err) => Promise.reject(err)
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Global
        styles={css`
          .tooltip-content {
            z-index: 999999 !important;
          }
        `}
      />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
