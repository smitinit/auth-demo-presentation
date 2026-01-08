import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import "./index.css";

import App from "./App.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

import { Login } from "./components/Login.tsx";
import { PatientDetails } from "./components/PatientDetails.tsx";
import { Encounters } from "./components/Encounters.tsx";
import { Patients } from "./components/Patients.tsx";
import { AppRoot } from "./components/AppRoot.tsx";

export const router = createBrowserRouter([
  {
    element: <AppRoot />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <App />,
            children: [
              {
                index: true,
                element: <div>Dashboard Home</div>,
              },
              {
                path: "patients",
                element: <Patients />,
                children: [{ path: ":patientId", element: <PatientDetails /> }],
              },
              {
                path: "encounters",
                element: <Encounters />,
                children: [{ path: ":patientId", element: <PatientDetails /> }],
              },
            ],
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
