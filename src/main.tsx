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
import PrivateRoute from "./route/PrivateRoute.tsx";
import Login from "./page/Login.tsx";
import Report from "./page/Report.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Test />,
  },
 
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <PrivateRoute element={<App />} /> ,
  },
  {
    path: "/report",
    element: <Report /> ,
  },

  {
    path: "*",
    element: <div>404 not found</div> ,
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
