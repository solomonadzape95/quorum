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
import { useLocation } from "react-router-dom";



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const context = useAppContext();
	if (!context) return null;
	const { globals } = context;
const location = useLocation();

    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [user, setUser] = React.useState<any>({});
    const [userOrg, setUserOrg] = useState<any>([])
     const fetchOrganizations = async () => {
    try {
      setIsLoading(true);

      // Get user's organizations
      if (globals.principal) {
         const user = await quorum_backend.getUser(globals.principal);
         if (user[0]) {
            setUser(user[0])
            console.log(user[0].organizations)
          // Fetch full details for each organization
          const allUserOrgs = await Promise.all(user[0].organizations.map(async (orgName: string) => {
            const orgDataArray = await quorum_backend.getOrgan(orgName);
            // Map through all organizations in the array
            return orgDataArray.map((org: any) => ({
              name: org.name,
              description: org.description,
              members: org.members,
              electionConducted: org.electionConducted,
              isPublic: org.isPublic,
              admins: org.admins,
              activeProposals: 0,
              treasury: 0,
              memberCount: org.members.length,
              memberActivity: 0,
              treasuryChange: 0,
              memberChange: 0,
              pfp: "https://picsum.photos/200"
            }));
          }));

          // Flatten the array since Promise.all will return array of arrays
          const flattenedOrgs = allUserOrgs.flat();
          console.log(flattenedOrgs)
          setUserOrg(flattenedOrgs);
        }

      }
    } catch (error) {
      console.error("Error fetching organizations:", error);
    } finally {
      setIsLoading(false);
    }
  };

const data = {
	navUser: [
		{
			title: "Overview",
			url: "/dashboard/overview",
			icon: LayoutDashboard,
			isActive: location.pathname === "/dashboard/overview",
		},
		{
			title: "My Organizations",
			url: "/dashboard/organizations",
			icon: Building2,
			isActive: location.pathname === "/dashboard/organizations",
		    },
		{
			title: "My Governance",
			url: "/dashboard/governance",
			icon: Vote,
			isActive: location.pathname === "/dashboard/governance",
		    },
		{
			title: "Analytics",
			url: "/dashboard/analytics",
			icon: LineChart,
			isActive: location.pathname === "/dashboard/analytics",
		},
		{
			title: "Calendar",
			url: "/dashboard/calendar",
			icon: Calendar,
			isActive: location.pathname === "/dashboard/calendar",
		},
	],
	navOrgs: [
		{
			title: "Overview",
			url: `/dashboard/organizations/${globals.teamId}`,
			icon: LayoutDashboard,
			isActive: location.pathname.split("/").pop() === globals.teamId
		},
		{
			title: "Governance",
			url: `/governance`,
			icon: Vote,
			isActive: location.pathname.split("/").pop() === "governance",
		},
		{
			title: "Analytics",
			url: `/analytics`,
			icon: LineChart,
			isActive: location.pathname.split("/").pop() === "analytics",
		},
		{
			title: "Members",
			url: `/members`,
			icon: Users,
			isActive: location.pathname.split("/").pop() === "members",
		},
		{
			title: "Treasury",
			url: `/treasury`,
			icon: Wallet,
			isActive: location.pathname.split("/").pop() === "treasury",
		},
		{
			title: "Calendar",
			url: `/calendar`,
			icon: Calendar,
			isActive: location.pathname.split("/").pop() === "calendar",
		},
	],
};
    useEffect(() => {
        fetchOrganizations();
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
