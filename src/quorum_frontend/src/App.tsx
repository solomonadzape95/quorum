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

import OrganizationCreationForm from "./components/forms/organizations";
import ProposalCreationForm from "./components/forms/proposal";
import ElectionCreationForm from "./components/forms/elections";
import ProfileCreationForm from "./components/forms/profile";
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
				element: <UserOverview />,
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
						path: "calendar",
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
