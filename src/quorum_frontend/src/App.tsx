import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <div>Hello home</div>,
      },
      {
        path: "settings",
        element: <div>Hi</div>,
      },
    ],
  },
  {
    element: <div>404</div>,
    path: "*",
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
