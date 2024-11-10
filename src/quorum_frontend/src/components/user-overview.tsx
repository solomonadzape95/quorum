import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
	Vote,
	Calendar,
	BarChart3,
	ChevronLeft,
	ArrowUpRight,
	ChevronRight,
	Users,
	Activity,
	Check,
	X,
	Briefcase,
	FileText,
	Coins,
	Zap,
	ArrowDownRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppContext } from "@/contexts/AppContext";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Outlet, useLocation, useParams } from "react-router-dom";
// Mock data remains the same as previous example
const organizations = [
	{
		id: 1,
		name: "DAO Innovators",
		role: "Admin",
		activeProposals: 3,
		treasury: 1500000,
	},
	{
		id: 2,
		name: "Decentralized Collective",
		role: "Member",
		activeProposals: 1,
		treasury: 800000,
	},
	{
		id: 3,
		name: "Blockchain Governance",
		role: "Member",
		activeProposals: 2,
		treasury: 2000000,
	},
];

const recentActivities = [
	{
		id: 1,
		type: "proposal_created",
		org: "DAO Innovators",
		description: "New marketing strategy proposal",
		timestamp: "2024-03-10T14:30:00Z",
	},
	{
		id: 2,
		type: "funds_transferred",
		org: "Blockchain Governance",
		description: "50,000 USDC transferred to development fund",
		timestamp: "2024-03-09T10:15:00Z",
	},
	{
		id: 3,
		type: "member_joined",
		org: "Decentralized Collective",
		description: "Alice (0x1234...abcd) joined the organization",
		timestamp: "2024-03-08T16:45:00Z",
	},
	{
		id: 4,
		type: "vote_cast",
		org: "DAO Innovators",
		description: "You voted on 'Upgrade to v2 Protocol'",
		timestamp: "2024-03-07T09:20:00Z",
	},
];

const upcomingTasks = [
	{
		id: 1,
		title: "Review Q2 Budget Proposal",
		org: "Blockchain Governance",
		dueDate: "2024-03-20",
	},
	{
		id: 2,
		title: "Vote on New Member Applications",
		org: "Decentralized Collective",
		dueDate: "2024-03-18",
	},
	{
		id: 3,
		title: "Participate in Community Call",
		org: "DAO Innovators",
		dueDate: "2024-03-15",
	},
];
export function UserOverview() {
	// Enable dark mode
	const { userid } = useParams();
	const location = useLocation();

	useEffect(() => {
		document.documentElement.classList.add("dark");
	}, []);

	const isBasePath = location.pathname === `/dashboard/overview`;
	return isBasePath ? (
		<div className='min-h-screen bg-[#0F0B15] bg-grid-small-white/[0.2] relative'>
			<div className='absolute inset-0 bg-[#0F0B15]/80 pointer-events-none' />
			<div className='relative'>
				<div className='container mx-auto p-8 space-y-8'>
					<header className='flex justify-between items-center mb-8'>
						<h1 className='text-4xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-500 bg-clip-text text-transparent'>
							My Dashboard
						</h1>
						<a href='/dashboard/organizations'>
							<Button
								variant='outline'
								className='border-purple-500 hover:bg-purple-500/20'
								title='View All Organizations'>
								<Users className='md:mr-2 h-8 w-8' />
								<span className='hidden md:block'>
									View All Organizations
								</span>
							</Button>
						</a>
					</header>

					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{organizations.map((org) => (
							<Card
								key={org.id}
								className='flex flex-col bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10'>
								<CardHeader className='pb-2'>
									<CardTitle className='text-xl flex items-center justify-between'>
										<span className='flex items-center'>
											<Briefcase className='mr-2 h-5 w-5 text-purple-400' />
											{org.name}
										</span>
										<Badge className='bg-purple-500/20 text-purple-300 hover:bg-purple-500/30'>
											{org.role}
										</Badge>
									</CardTitle>
								</CardHeader>
								<CardContent className='py-2'>
									<div className='flex justify-between items-center mb-2'>
										<span className='text-sm text-purple-300'>
											Active Proposals
										</span>
										<Badge
											variant='secondary'
											className='bg-purple-500/20'>
											{org.activeProposals}
										</Badge>
									</div>
									<div className='flex justify-between items-center'>
										<span className='text-sm text-purple-300'>
											Treasury
										</span>
										<span className='font-medium text-purple-100'>
											${org.treasury.toLocaleString()}
										</span>
									</div>
								</CardContent>
								<CardFooter className='mt-auto pt-2'>
									<Button
										variant='ghost'
										className='w-full hover:bg-purple-500/20 text-purple-300'>
										<Zap className='mr-2 h-4 w-4' />
										Quick Actions
									</Button>
								</CardFooter>
							</Card>
						))}
					</div>

					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
						<Card className='bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10'>
							<CardHeader>
								<CardTitle className='text-2xl flex items-center text-purple-100'>
									<Activity className='mr-2 h-6 w-6 text-purple-400' />
									Recent Activities
								</CardTitle>
								<CardDescription className='text-purple-300'>
									Latest actions across your organizations
								</CardDescription>
							</CardHeader>
							<CardContent>
								<ScrollArea className='h-[300px] pr-4'>
									{recentActivities.map((activity) => (
										<div
											key={activity.id}
											className='mb-4 last:mb-0'>
											<div className='flex items-start space-x-4 p-4 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 transition-colors'>
												<div
													className={`p-2 rounded-full flex-shrink-0 bg-purple-500/20`}>
													{activity.type ===
													"proposal_created" ? (
														<FileText className='h-5 w-5 text-purple-300' />
													) : activity.type ===
													  "funds_transferred" ? (
														<Coins className='h-5 w-5 text-purple-300' />
													) : activity.type ===
													  "member_joined" ? (
														<Users className='h-5 w-5 text-purple-300' />
													) : (
														<Vote className='h-5 w-5 text-purple-300' />
													)}
												</div>
												<div className='flex-grow'>
													<p className='font-medium text-purple-100'>
														{activity.description}
													</p>
													<p className='text-sm text-purple-300'>
														{activity.org}
													</p>
													<p className='text-xs text-purple-400 mt-1'>
														{new Date(
															activity.timestamp
														).toLocaleString()}
													</p>
												</div>
											</div>
											<Separator className='my-4 bg-purple-500/20' />
										</div>
									))}
								</ScrollArea>
							</CardContent>
							<CardFooter>
								<Button
									variant='ghost'
									className='w-full hover:bg-purple-500/20 text-purple-300'>
									View All Activities{" "}
									<ChevronRight className='ml-2 h-4 w-4' />
								</Button>
							</CardFooter>
						</Card>

						<Card className='bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10'>
							<CardHeader>
								<CardTitle className='text-2xl flex items-center text-purple-100'>
									<Calendar className='mr-2 h-6 w-6 text-purple-400' />
									Upcoming Tasks
								</CardTitle>
								<CardDescription className='text-purple-300'>
									Your pending actions and events
								</CardDescription>
							</CardHeader>
							<CardContent>
								<ScrollArea className='h-[300px] pr-4'>
									{upcomingTasks.map((task) => (
										<div
											key={task.id}
											className='mb-4 last:mb-0'>
											<div className='flex items-center justify-between p-4 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 transition-colors'>
												<div>
													<h3 className='font-semibold text-purple-100'>
														{task.title}
													</h3>
													<p className='text-sm text-purple-300'>
														{task.org}
													</p>
												</div>
												<Badge
													variant='outline'
													className='ml-2 border-purple-500/40 text-purple-300'>
													Due{" "}
													{new Date(
														task.dueDate
													).toLocaleDateString()}
												</Badge>
											</div>
											<Separator className='my-4 bg-purple-500/20' />
										</div>
									))}
								</ScrollArea>
							</CardContent>
							<CardFooter>
								<Button
									variant='ghost'
									className='w-full hover:bg-purple-500/20 text-purple-300'>
									View All Tasks{" "}
									<ChevronRight className='ml-2 h-4 w-4' />
								</Button>
							</CardFooter>
						</Card>
					</div>

					<Card className='bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10'>
						<CardHeader>
							<CardTitle className='text-2xl flex items-center text-purple-100'>
								<Coins className='mr-2 h-6 w-6 text-purple-400' />
								Treasury Overview
							</CardTitle>
							<CardDescription className='text-purple-300'>
								Total funds across all your organizations
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className='text-4xl font-bold mb-4 text-purple-100'>
								$
								{organizations
									.reduce((sum, org) => sum + org.treasury, 0)
									.toLocaleString()}
							</div>
							<div className='space-y-4'>
								{organizations.map((org) => (
									<div key={org.id}>
										<div className='flex justify-between mb-2'>
											<span className='font-medium text-purple-300'>
												{org.name}
											</span>
											<span className='font-medium text-purple-100'>
												${org.treasury.toLocaleString()}
											</span>
										</div>
										<Progress
											value={
												(org.treasury /
													organizations.reduce(
														(sum, o) =>
															sum + o.treasury,
														0
													)) *
												100
											}
											className='h-2 bg-purple-500/20'
										/>
									</div>
								))}
							</div>
						</CardContent>
						<CardFooter>
							<Button
								variant='outline'
								className='w-full border-purple-500 hover:bg-purple-500/20 text-purple-300'>
								Manage Treasury Allocations
							</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
		</div>
	) : (
		<Outlet />
	);
}
