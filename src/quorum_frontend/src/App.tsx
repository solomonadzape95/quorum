import OrgAnalyticsPage from "./components/org-analytics";
import OrgGovernancePage from "./components/org-governance";
import OrgMembersPage from "./components/org-members";
import OrganizationsPage from "./components/organizations";
import { OrganizationDetails } from "./components/org-overview";
import { DashboardOverview } from "./components/user-overview";
import UserAnalyticsPage from "./components/user-analytics";
import UserCalendarPage from "./components/user-calendar";
import UserGovernancePage from "./components/user-governace";
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
        element: <DashboardOverview />,
      },
      {
        path: "org/:orgid",
        element: <OrganizationDetails />,
        children: [
          {
            path: "gov",
            element: <OrgGovernancePage />,
          },
          {
            path: "stats",
            element: <OrgAnalyticsPage />,
          },
          {
            path: "members",
            element: <OrgMembersPage />,
          },
        ],
      },

      {
        path: "user/:userid",
        element: <DashboardOverview />,
        children: [
          {
            path: "orgs",
            element: <OrganizationsPage />,
          },
          {
            path: "gov",
            element: <UserGovernancePage />,
          },
          {
            path: "stats",
            element: <UserAnalyticsPage />,
          },
          {
            path: "dates",
            element: <UserCalendarPage />,
          },
        ],
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
