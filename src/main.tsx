import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
// import { MarketProvider } from "./context/maketContext.tsx";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Test from "./page/Test.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Test />,
  },
  {
    path: "/dashboard",
    element: <App />,
  },
]);


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
