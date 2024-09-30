import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import 'ag-grid-community/styles/ag-theme-balham.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Test from "./page/Test.tsx";
import { MarketProvider } from "./context/MarketContext.tsx";


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
      <MarketProvider>
        <RouterProvider router={router} />
      </MarketProvider>
    </Provider>
  </React.StrictMode>
);
