import React from "react";
import ReactDOM from "react-dom";
import { CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { store } from "./store";

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
