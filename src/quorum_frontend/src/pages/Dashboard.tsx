import { useAppContext } from "../contexts/AppContext";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "../components/app-sidebar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Dashboard() {
	const context = useAppContext();

	if (!context) return null;

	const { globals, updateView } = context;


	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<div className='sticky top-0 z-10'>
					<SidebarTrigger 
						className='absolute left-4 top-[50vh] transform -translate-y-1/2 bg-background border rounded-full p-1 shadow-sm'
					/>
				</div>
				<Outlet />
			</SidebarInset>
		</SidebarProvider>
	);
}
