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
import TestingContextLayout from "./components/TestingContextLayout.tsx";

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
                element: (
                  <div className="flex items-center justify-center mt-[20rem]">
                    Navigate to
                    <b className="text-primary"> &nbsp; Encounters &nbsp;</b>
                    and
                    <b className="text-primary">&nbsp; Patients &nbsp;</b>
                    from Sidebar to get started.
                  </div>
                ),
              },
              {
                path: "patients",
                element: <Patients />,
              },
              {
                path: "patients/:patientId",
                element: <PatientDetails />,
              },
              {
                path: "encounters",
                element: <Encounters />,
              },
              {
                path: "encounters/:patientId",
                element: <PatientDetails />,
              },
              {
                path: "testing-context",
                element: <TestingContextLayout />,
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
