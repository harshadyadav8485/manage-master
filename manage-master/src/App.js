import logo from "./logo.svg";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home } from "./Pages/Home";
import { AppLayout } from "./Components/Layout/AppLayout";
import "./App.css";

import { States } from "./Pages/States";
import { District } from "./Pages/Districts";
import { SubDistricts } from "./Pages/SubDistricts";
import { Villages } from "./Pages/Villages";
import { AddState } from "./Pages/AddState";
import { AddDistrict } from "./Pages/AddDistrict";
import { Cards } from "./Pages/Cards";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/states",
          element: <States />,
        },
        {
          path: "/districts",
          element: <District />,
        },
        {
          path: "/SubDistricts",
          element: <SubDistricts />,
        },
        {
          path: "/villages",
          element: <Villages />,
        },
        {
          path: "/addState",
          element: <AddState />,
        },
        {
          path: "/addDistrict",
          element: <AddDistrict />,
        },
        {
          path: "/cards",
          element: <Cards />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
