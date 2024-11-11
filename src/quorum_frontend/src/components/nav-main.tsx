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
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";

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
									to={item.url}
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
