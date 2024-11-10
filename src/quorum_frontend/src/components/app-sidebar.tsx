import * as React from "react";
import {
	AudioWaveform,
	BookOpen,
	Bot,
	Command,
	GalleryVerticalEnd,
	SquareTerminal,
	LayoutDashboard,
	Vote,
	LineChart,
	Users,
	Wallet,
	Settings,
	Building2,
	Calendar,
	User,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import { useAppContext } from "@/contexts/AppContext";

const data = {
	user: {
		name: "Gloria Madubueze",
		email: "gloriaim@nacos.org",
		avatar: "/images/gim.jpg",
	},
	organizations: [
		{
			name: "Acme Inc",
			logo: GalleryVerticalEnd,
			plan: "Enterprise",
		},
		{
			name: "Acme Corp.",
			logo: AudioWaveform,
			plan: "Startup",
		},
		{
			name: "Evil Corp.",
			logo: Command,
			plan: "Free",
		},
	],
	navUser: [
		{
			title: "Overview",
			url: "/dashboard",
			icon: LayoutDashboard,
			isActive: true,
		},
		{
			title: "My Organizations",
			url: "/dashboard/organizations",
			icon: Building2,
		},
		{
			title: "My Governance",
			url: "/dashboard/governance",
			icon: Vote,
		},
		{
			title: "Analytics",
			url: "/dashboard/analytics",
			icon: LineChart,
		},
		{
			title: "Calendar",
			url: "/dashboard/calendar",
			icon: Calendar,
		},
	],
	navOrgs: [
		{
			title: "Overview",
			url: "/dashboard",
			icon: LayoutDashboard,
			isActive: true,
		},
		{
			title: "Governance",
			url: "/dashboard/governance",
			icon: Vote,
		},
		{
			title: "Analytics",
			url: "/dashboard/analytics",
			icon: LineChart,
		},
		{
			title: "Members",
			url: "/dashboard/members",
			icon: Users,
		},
		{
			title: "Treasury",
			url: "/dashboard/treasury",
			icon: Wallet,
		},
		{
			title: "Calendar",
			url: "/dashboard/calendar",
			icon: Calendar,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const context = useAppContext();
	if (!context) return null;
	const { globals, updateView } = context;
	return (
		<Sidebar
			collapsible='icon'
			{...props}>
			<SidebarHeader>
				<TeamSwitcher
					teams={data.organizations}
					user={data.user}
				/>
			</SidebarHeader>
			<SidebarContent>
				<NavMain
					items={
						globals.view === "user" ? data.navUser : data.navOrgs
					}
				/>
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
