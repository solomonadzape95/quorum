import OrgAnalyticsPage from "./components/org-analytics";
import OrgGovernancePage from "./components/org-governance";
import OrgMembersPage from "./components/org-members";
import OrganizationsPage from "./components/organizations";
import { OrganizationOverview } from "./components/org-overview";
import { UserOverview } from "./components/user-overview";
import UserAnalyticsPage from "./components/user-analytics";
import UserCalendarPage from "./components/user-calendar";
import UserGovernancePage from "./components/user-governace";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "overview",
        element: <DashboardLayout />,
      },
      {
        path: "organizations/:orgid",
        element: <OrganizationOverview />,
        children: [
          {
            path: "governance",
            element: <OrgGovernancePage />,
          },
          {
            path: "analytics",
            element: <OrgAnalyticsPage />,
          },
          {
            path: "members",
            element: <OrgMembersPage />,
          },
        ],
      },
      {
        path: "organizations",
        element: <OrganizationsPage />,
      },
      {
        path: "governance",
        element: <UserGovernancePage />,
      },
      {
        path: "analytics",
        element: <UserAnalyticsPage />,
      },
      {
        path: "calendar",
        element: <UserCalendarPage />,
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
