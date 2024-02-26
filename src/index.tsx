import React from "react";

import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import App from "./components/App";
import "./index.css";
import "normalize.css";

const container = document.getElementById("root");
const root = createRoot(container as HTMLElement);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter basename="Test-template">
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
