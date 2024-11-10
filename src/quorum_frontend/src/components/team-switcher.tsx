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

interface User {
	name: string;
	email: string;
	avatar: string;
}
interface Team {
	id: string;
	name: string;
	logo: React.ElementType;
	plan: string;
}

export function TeamSwitcher({ teams, user }: { teams: Team[]; user: User }) {
	const { isMobile } = useSidebar();
	const context = useAppContext();
	const navigate = useNavigate();

	if (!context) return null;

	const { globals, updateView } = context;
	const [activeTeam, setActiveTeam] = React.useState<User | Team>(() => {
		return globals.activeTeam === "user"
			? user
			: teams.find((team) => team.id === globals.activeTeam) || user;
	});

	useEffect(() => {
		// Set the default active team based on the context
		if (globals.view === "user") {
			setActiveTeam(user);
		} else {
			const defaultTeam = teams.find((team) => team.id === globals.view);
			if (defaultTeam) {
				setActiveTeam(defaultTeam);
			}
		}
	}, [globals.view, teams, user]);

	function changeActive(team: Team | User, view: "user" | "org") {
		const teamId =
			view === "user" ? "user" : "id" in team ? team.id : "user";

		updateView(view, teamId);
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
			<SidebarMenuItem className='my-1'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size='lg'
							className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground bg-[#0C0512] hover:bg-[#0C0512]/80 hover:shadow-sm transition-colors duration-300'>
							{"email" in activeTeam ? (
								<>
									<div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
										<Avatar>
											<AvatarImage
												src={activeTeam.avatar}
												alt={activeTeam.name}
											/>
										</Avatar>
									</div>
									<div className='grid flex-1 text-left text-sm leading-tight'>
										<span className='truncate font-semibold'>
											{activeTeam.name}
										</span>
										{typeof activeTeam === "object" &&
											"plan" in activeTeam && (
												<span className='truncate text-xs'>
													{activeTeam.email}
												</span>
											)}
									</div>
									<ChevronsUpDown className='ml-auto' />{" "}
								</>
							) : (
								<>
									<div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
										<activeTeam.logo className='size-4' />
									</div>
									<div className='grid flex-1 text-left text-sm leading-tight'>
										<span className='truncate font-semibold'>
											{activeTeam.name}
										</span>
										<span className='truncate text-xs'>
											{activeTeam.plan}
										</span>
									</div>
									<ChevronsUpDown className='ml-auto' />{" "}
								</>
							)}
						</SidebarMenuButton>
					</DropdownMenuTrigger>

					<DropdownMenuContent
						className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-[#130E1C] gradient--border'
						align='start'
						side={isMobile ? "bottom" : "right"}
						sideOffset={4}>
						<DropdownMenuItem
							onClick={() => {
								changeActive(user, "user");
							}}
							className='gap-2 p-2'>
							<Avatar className='h-8 w-8 rounded-lg'>
								<AvatarImage
									src={user.avatar}
									alt={user.name}
								/>
								<AvatarFallback className='rounded-lg'>
									CN
								</AvatarFallback>
							</Avatar>
							<div className='grid flex-1 text-left text-sm leading-tight'>
								<span className='truncate font-semibold'>
									{user.name}
								</span>
								<span className='truncate text-xs'>
									{user.email}
								</span>
							</div>
						</DropdownMenuItem>
						<DropdownMenuLabel className='text-xs text-muted-foreground'>
							Organizations
						</DropdownMenuLabel>
						{teams.map((team, index) => (
							<DropdownMenuItem
								key={team.name}
								onClick={() => {
									changeActive(team, "org");
								}}
								className='gap-2 p-2'>
								<div className='flex size-6 items-center justify-center rounded-sm border'>
									<team.logo className='size-4 shrink-0' />
								</div>
								{team.name}
								<DropdownMenuShortcut>
									⌘{index + 1}
								</DropdownMenuShortcut>
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator />
						<DropdownMenuItem className='gap-2 p-2'>
							<div className='flex size-6 items-center justify-center rounded-md border bg-background'>
								<Plus className='size-4' />
							</div>
							<div className='font-medium text-muted-foreground'>
								Add Organization
							</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
