import React from "react";
import { useAppContext } from "../contexts/AppContext";
import { UserOverview } from "../components/user-overview";
import { OrganizationOverview } from "../components/org-overview";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
	const context = useAppContext();
	if (!context) return null;

	const { globals } = context;

	return (
		<div className='p-4'>
			{globals.view === "user" ? (
				<UserOverview />
			) : (
				<OrganizationOverview />
			)}
			<Outlet />
		</div>
	);
}
