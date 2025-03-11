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
import { EditState } from "./Pages/EditState";
import { AddVillage } from "./Pages/AddVillgae";
import { EditVillage } from "./Pages/EditVillage";
import StickyHeadTable from "./Pages/StickyHeader";
import { Overflow } from "./Pages/Overflow";
import { Projects } from "./Pages/Projects";
import { AddProjects } from "./Pages/AddProjects";
import { Epic } from "./Pages/Epic";
import { AddEpic } from "./Pages/AddEpic";
import { CreateTask } from "./Pages/AddTask";
import { Practice } from "./Pages/Practice";
import Subtask from "./Pages/Subtask";
import { Role, ROle } from "./Pages/Role";
import { EditRole } from "./Pages/EditRole";
import { Practice2 } from "./Pages/Practice2";
import { AddVillages } from "./Pages/AddVillages";
import { Project } from "./Pages/Project";
import { ProjectPost } from "./Pages/ProjectPost";
import { VillagePost } from "./Pages/VillagePost";
import { ViewTabel } from "./Pages/ViewTabel";
import Dashboard from "./Pages/Dashbord";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "states",
          element: <States />,
        },
        {
          path: "districts",
          element: <District />,
        },
        {
          path: "subDistricts",
          element: <SubDistricts />,
        },
        {
          path: "villages",
          element: <Villages />,
        },
        {
          path: "addState",
          element: <AddState />,
        },
        {
          path: "addDistrict",
          element: <AddDistrict />,
        },
        {
          path: "cards",
          element: <Cards />,
        },
        {
          path: "editState/:stateId",
          element: <EditState />,
        },
        {
          path: "addVillage",
          element: <AddVillage />,
        },
        {
          path: "/editVillage/:villageId",
          element: <EditVillage />,
        },
        {
          path: "/sticky",
          element: <StickyHeadTable />,
        },
        {
          path: "/overflow",
          element: <Overflow />,
        },
        {
          path: "/projects",
          element: <Projects />,
        },
        {
          path: "/addProjects",
          element: <AddProjects />,
        },
        {
          path: "/epic",
          element: <Epic />,
        },
        {
          path: "/addEpic",
          element: <AddEpic />,
        },
        {
          path: "/createTask",
          element: <CreateTask />,
        },
        {
          path: "/practice",
          element: <Practice />,
        },
        {
          path: "/subtask",
          element: <Subtask />,
        },
        {
          path: "/role",
          element: <Role />,
        },

        {
          path: "editROle/:roleId",
          element: <EditRole />,
        },
        {
          path: "Practice2",
          element: <Practice2 />,
        },
        {
          path: "Practice2",
          element: <Practice2 />,
        },
        {
          path: "addVillages",
          element: <AddVillages />,
        },
        {
          path: "/project",
          element: <Project />,
        },
        {
          path: "/projectCreate",
          element: <ProjectPost />,
        },
        {
          path: "/villagePost",
          element: <VillagePost />,
        },
        {
          path: "/table",
          element: <ViewTabel />,
        },
        {
          path: "/dashbord",
          element: <Dashboard />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
