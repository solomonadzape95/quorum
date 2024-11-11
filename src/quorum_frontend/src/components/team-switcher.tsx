import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { AvatarFallback, Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useAppContext } from "@/contexts/AppContext";
import { Organization, UserData } from "@/types";
import { quorum_backend } from "../../../declarations/quorum_backend";

export function TeamSwitcher({ user }: { user: any }) {
  const { isMobile } = useSidebar();
  const context = useAppContext();
  const [organizations, setOrganizations] = React.useState<Organization[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeTeam, setActiveTeam] = React.useState<UserData | Organization>(user);

  // Fetch organizations
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        if (!user ||!user.organizations) return;

        const allUserOrgs = await Promise.all(
          user.organizations.map(async (orgName: string) => {
            const orgDataArray = await quorum_backend.getOrgan(orgName);
            return orgDataArray.map((org: any) => ({
              id: org.name, // assuming name is used as ID
              name: org.name,
              description: org.description,
              members: org.members,
              admins: org.admins,
              pfp: org.pfp || "https://picsum.photos/200", // or org.pfp if available
              isPublic: org.isPublic,
              electionConducted: org.electionConducted,
            }));
          })
        );

        const flattenedOrgs = allUserOrgs.flat();
        setOrganizations(flattenedOrgs);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrganizations();
  }, [user]);


  if (!context ||!user) return null;
  if (isLoading) return <div>Loading...</div>; // Add proper loading state UI

  const { globals, updateView } = context;
  const navigate = useNavigate();
//   useEffect(() => {
//     if (globals.activeTeam === "user") {
//       setActiveTeam(user);
//     } else {
//       const activeOrg = organizations.find((org) => org.id === globals.activeTeam);
//       setActiveTeam(activeOrg || user);
//     }
//   }, [globals.activeTeam, organizations, user]);

  function changeActive(team: Organization | UserData, view: "user" | "org") {
    const teamId =
      view === "user"? "user" : "id" in team? team.id : "user";

    updateView(view);
    setActiveTeam(team);

    // Navigate to the appropriate root path
    if (view === "org" && "id" in team) {
      navigate(`/dashboard/organizations/${team.id}`);
    } else if (view === "user") {
      navigate(`/dashboard/overview`);
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem className="my-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground bg-[#0C0512] hover:bg-[#0C0512]/80 hover:shadow-sm transition-colors duration-300"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Avatar>
                  <AvatarImage src={activeTeam.pfp} />
                </Avatar>
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {"name" in activeTeam? activeTeam.name : activeTeam.displayName}
                </span>
                <span className="truncate text-xs">
                  {"id" in activeTeam? activeTeam.id.slice(0, 6) : activeTeam.principalId.slice(0, 6)}...
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-[#130E1C] gradient--border"
            align="start"
            side={isMobile? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuItem
              onClick={() => {
                changeActive(user, "user");
              }}
              className="gap-2 p-2"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.pfp} alt={user?.displayName} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-purple-100">
                  {user?.displayName}
                </span>
                <span className="truncate text-xs text-purple-300">
                  {user?.principalId.slice(0, 6)}...
                </span>
              </div>
            </DropdownMenuItem>

            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Organizations
            </DropdownMenuLabel>

            {organizations.map((organization, index) => (
              <DropdownMenuItem
                key={organization.id}
                onClick={() => {
                  changeActive(organization, "org");
                }}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={organization.pfp} alt={organization.name} />
                  </Avatar>
                </div>
                {organization.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />

            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">
                Add Organization
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}