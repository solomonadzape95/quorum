import { type LucideIcon } from "lucide-react";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import { useEffect, useState } from "react";

export function NavMain({
	items,
}: {
	items: {
		title: string;
		url: string;
		icon?: LucideIcon;
		isActive?: boolean;
	}[];
}) {
    const { globals } = useAppContext();
    const [view, setView] = useState<"user" | "org">(globals.view);
    const {teamId} = useSidebar();
    useEffect(() => {
        setView(globals.view);
    }, [globals.view]);
	return (
		<SidebarGroup>
			<SidebarMenu>
				{items.map((item) => (
					<Collapsible
						key={item.title}
						asChild
						defaultOpen={item.isActive}
						className={`group/collapsible hover:bg-[#6c49c4] active:bg-[#6c49c4] py-2 rounded-lg shadow-sm my-1 ${item.isActive ? 'bg-[#6c49c4]' : ''}`}>
						<SidebarMenuItem>
							<SidebarMenuButton
								tooltip={item.title}
								className=' hover:bg-[#6c49c4] active:bg-[#6c49c4] px-4'>
								<NavLink
									to={view === "user" 
										? item.url 
										: `/dashboard/organizations/${teamId}${item.url.startsWith('/') ? item.url : `/${item.url}`}`
									}
									className='flex items-center gap-2 w-full'>
									<span className='flex items-center justify-center size-6'>
										{item.icon && <item.icon />}
									</span>
									<span>{item.title}</span>
								</NavLink>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</Collapsible>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
