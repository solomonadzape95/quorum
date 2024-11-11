import { quorum_backend } from "../../../declarations/quorum_backend";
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
import { useEffect, useState } from "react";
import { organizationService } from "@/services/dbService";

const data = {
	user: {
		username: "techke4ma",
		displayName: "Gloria Madubueze",
		principalId: "gloriaim@nacos.org",
		pfp: "/Images/gim.jpg",
	},
	organizations: [
		{
			id: "1",
			name: "Acme Inc",
			pfp: "/Images/gim.jpg",
			isPublic: true,
			description: "Acme Inc is a company that makes widgets",
			members: ["gloriaim@nacos.org"],
			electionConducted: [],
		},
		{
			id: "2",
			name: "Acme Corp.",
			pfp: "/Images/gim.jpg",
			isPublic: true,
			description: "Acme Corp. is a company that makes widgets",
			members: ["gloriaim@nacos.org"],
			electionConducted: [],
		},
		{
			id: "3",
			name: "Evil Corp.",
			pfp: "/Images/gim.jpg",
			isPublic: true,
			description: "Evil Corp. is a company that makes widgets",
			members: ["gloriaim@nacos.org"],
			electionConducted: [],
		},
	],
	navUser: [
		{
			title: "Overview",
			url: "/dashboard/overview",
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
			url: "/dashboard/overview",
			icon: LayoutDashboard,
			isActive: true,
		},
		{
			title: "Governance",
			url: "/governance",
			icon: Vote,
		},
		{
			title: "Analytics",
			url: "/analytics",
			icon: LineChart,
		},
		{
			title: "Members",
			url: "/members",
			icon: Users,
		},
		{
			title: "Treasury",
			url: "/treasury",
			icon: Wallet,
		},
		{
			title: "Calendar",
			url: "/calendar",
			icon: Calendar,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const context = useAppContext();
	if (!context) return null;
	const { globals } = context;

    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [user, setUser] = React.useState<any>({});
    const [userOrg, setUserOrg] = useState<any>([])

    useEffect(() => {
        async function getUserOrgs() {
            const res = await organizationService.getOrganizationsByMember(globals.principal || '');
            setUserOrg(res)
        }

        getUserOrgs();
        async function getUserData() {
            if (globals.principal) {
                const user = await quorum_backend.getUser(globals.principal);
            if (user) {
                console.log(user);
                setUser(user[0]);
                setIsLoading(false);
				}
			}
		}
			getUserData();
	}, []);

if (isLoading) return null;

	return (
		<Sidebar
			collapsible='icon'
			{...props}>
			<SidebarHeader>
				<TeamSwitcher
					user={user ?? undefined}
                    organizations={userOrg ?? []}
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
				<NavUser user={user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
