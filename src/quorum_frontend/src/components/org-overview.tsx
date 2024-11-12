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
import { Outlet, useLocation, useParams, useNavigate, Link } from "react-router-dom";
import { quorum_backend } from "../../../declarations/quorum_backend";
import { Loader2 } from "lucide-react";

export function OrganizationOverview() {
	const [activeTab, setActiveTab] = useState("overview");
	const { orgid } = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const [organization, setOrganization] = useState<any>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchOrganizationData = async () => {
			try {
				setIsLoading(true);
				setError(null);

				// Convert URL-safe name back to original format
				const orgName = location.pathname.split('/').pop()?.replace(/\+/g, ' ');
				
				if (!orgName) {
					throw new Error('Organization name is required');
				}

				const orgData = await quorum_backend.getOrgan(orgName);
				
				if (orgData && orgData.length > 0) {
					// Transform the data to match your UI needs
					const transformedData = {
						...orgData[0],
						treasury: 1500, // Add default values for missing fields
						treasuryChange: 2.4,
						memberCount: orgData[0]?.members?.length || 0,
						memberChange: 80,
						memberActivity: 65,
						activeProposals: 0,
						// Add other required fields with default values
					};
					
					setOrganization(transformedData);
				} else {
					throw new Error('Organization not found');
				}
			} catch (err) {
				console.error('Error fetching organization:', err);
				setError(err instanceof Error ? err.message : 'Failed to fetch organization data');
				navigate('/dashboard/organizations'); // Redirect on error
			} finally {
				setIsLoading(false);
			}
		};

		fetchOrganizationData();
	}, [orgid, navigate]);

	if (isLoading) {
		return (
			<div className="min-h-screen bg-[#0F0B15] flex items-center justify-center">
				<Loader2 className="h-8 w-8 animate-spin text-purple-500" />
			</div>
		);
	}

	if (error || !organization) {
		return (
			<div className="min-h-screen bg-[#0F0B15] flex items-center justify-center">
				<div className="text-red-400">{error || 'Organization not found'}</div>
			</div>
		);
	}

	return (
		<>
			<div className='min-h-screen bg-[#0F0B15] bg-grid-small-white/[0.2] relative'>
				<div className='absolute inset-0 bg-[#0F0B15]/80 pointer-events-none' />
				<div className='relative'>
					<div className='container mx-auto p-8 space-y-8'>
						<header className='flex justify-between items-center mb-8'>
							<div className='flex items-center flex-col md:flex-row  space-x-6'>
								<Avatar className='w-24 h-24 border-4 border-purple-500 rounded flex justify-center items-center mb-4 md:m-0'>
									<AvatarImage
										src={organization.pfp || "/placeholder.svg"}
										alt={organization.name}
									/>
									<AvatarFallback>
										{organization.name
											.slice(0, 2)
											.toUpperCase()}
									</AvatarFallback>
								</Avatar>
								<div>
									<h1 className='text-4xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-500 bg-clip-text text-center md:text-left text-transparent'>
										{organization.name}
									</h1>
									<p className='text-purple-300 mt-2 text-sm md:text-base text-center md:text-left'>
										{organization.description}
									</p>
								</div>
							</div>
							<Link 
                                to={`/dashboard/organizations/${organization.name.split(' ').join('+')}/governance`}
								className="bg-purple-500 hover:bg-purple-600 flex items-center gap-2"
							>
								<Vote className="h-4 w-4" />
								Governance
							</Link><Link 
                                to={`/dashboard/organizations/${organization.name.split(' ').join('+')}/members`}
								className="bg-purple-500 hover:bg-purple-600 flex items-center gap-2"
							>
								<Vote className="h-4 w-4" />
								Members
							</Link><Link 
                                to={`/dashboard/organizations/${organization.name.split(' ').join('+')}/analytics`}
								className="bg-purple-500 hover:bg-purple-600 flex items-center gap-2"
							>
								<Vote className="h-4 w-4" />
								analytics
							</Link>
						</header>

						<Tabs
							value={activeTab}
							onValueChange={setActiveTab}    
							className='space-y-4'>
							<TabsList className='bg-purple-500/10 p-1'>
								<TabsTrigger
									value='overview'
									className='data-[state=active]:bg-purple-500 data-[state=active]:text-white'>
									Overview
								</TabsTrigger>
								<TabsTrigger
									value='proposals'
									className='data-[state=active]:bg-purple-500 data-[state=active]:text-white'>
									Proposals & Votes
								</TabsTrigger>
								<TabsTrigger
									value='activity'
									className='data-[state=active]:bg-purple-500 data-[state=active]:text-white'>
									Recent Activity
								</TabsTrigger>
							</TabsList>

							<TabsContent value='overview'>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
									<Card className='bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10'>
										<CardHeader>
											<CardTitle className='text-2xl flex items-center text-purple-100'>
												<Coins className='mr-2 h-6 w-6 text-purple-400' />
												Treasury
											</CardTitle>
										</CardHeader>
										<CardContent className='space-y-4'>
											<div className='flex justify-between items-center'>
												<p className='text-3xl font-bold text-purple-100'>
													$
													{organization.treasury.toLocaleString()}
												</p>
												<Badge
													variant='outline'
													className={`flex items-center ${
														organization.treasuryChange >=
														0
															? "text-green-400 border-green-400"
															: "text-red-400 border-red-400"
													}`}>
													{organization.treasuryChange >=
													0 ? (
														<ArrowUpRight className='mr-1 h-4 w-4' />
													) : (
														<ArrowDownRight className='mr-1 h-4 w-4' />
													)}
													{Math.abs(
														organization.treasuryChange
													)}
													%
												</Badge>
											</div>
											<Progress
												value={75}
												className='h-2 bg-purple-500/20'
											/>
											<p className='text-sm text-purple-300'>
												{organization.budgetUtilization ? organization.budgetUtilization.toFixed(2) : 0}% of yearly budget utilized
											</p>
										</CardContent>
									</Card>

									<Card className='bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10'>
										<CardHeader>
											<CardTitle className='text-2xl flex items-center text-purple-100'>
												<Users className='mr-2 h-6 w-6 text-purple-400' />
												Membership
											</CardTitle>
										</CardHeader>
										<CardContent className='space-y-4'>
											<div className='flex justify-between items-center'>
												<p className='text-3xl font-bold text-purple-100'>
													{organization.memberCount.toLocaleString()}
												</p>
												<Badge
													variant='outline'
														className={`flex items-center ${
															organization.memberChange >=
																0
																	? "text-green-400 border-green-400"
																	: "text-red-400 border-red-400"
															}`}>
													{organization.memberChange >=
														0 ? (
															<ArrowUpRight className='mr-1 h-4 w-4' />
														) : (
															<ArrowDownRight className='mr-1 h-4 w-4' />
														)}
													{Math.abs(
														organization.memberChange
													)}
													%
												</Badge>
											</div>
											<div>
												<div className='flex justify-between items-center mb-2'>
													<p className='text-sm text-purple-300'>
														Member Activity
													</p>
													<span className='text-sm font-medium text-purple-100'>
														{
															organization.memberActivity
														}
														%
													</span>
												</div>
												<Progress
													value={
														organization.memberActivity
													}
													className='h-2 bg-purple-500/20'
												/>
											</div>
										</CardContent>
									</Card>

									<Card className='bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10 md:col-span-2'>
										<CardHeader>
											<CardTitle className='text-2xl flex items-center text-purple-100'>
												<Activity className='mr-2 h-6 w-6 text-purple-400' />
												Quick Stats
											</CardTitle>
										</CardHeader>
										<CardContent>
											<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
												<div className='bg-purple-500/10 p-4 rounded-lg'>
													<p className='text-sm text-purple-300 mb-1'>
														Active Proposals
													</p>
													<p className='text-2xl font-bold text-purple-100'>
														{
															organization.activeProposals
														}
													</p>
												</div>
												<div className='bg-purple-500/10 p-4 rounded-lg'>
													<p className='text-sm text-purple-300 mb-1'>
														Total Votes Cast
													</p>
													<p className='text-2xl font-bold text-purple-100'>
														{organization.totalVotes ? organization.totalVotes.toLocaleString() : 0}
													</p>
												</div>
												<div className='bg-purple-500/10 p-4 rounded-lg'>
													<p className='text-sm text-purple-300 mb-1'>
														Avg. Participation
													</p>
													<p className='text-2xl font-bold text-purple-100'>
														{organization.avgParticipation ? organization.avgParticipation.toFixed(2) : 0}%
													</p>
												</div>
												<div className='bg-purple-500/10 p-4 rounded-lg'>
													<p className='text-sm text-purple-300 mb-1'>
														Execution Rate
													</p>
													<p className='text-2xl font-bold text-purple-100'>
														{organization.executionRate ? organization.executionRate.toFixed(2) : 0}%
													</p>
												</div>
											</div>
										</CardContent>
									</Card>
								</div>
							</TabsContent>

							<TabsContent value='proposals'>
								<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
									<Card className='bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10'>
										<CardHeader>
											<CardTitle className='text-2xl flex items-center text-purple-100'>
												<Vote className='mr-2 h-6 w-6 text-purple-400' />
												Recent Votes
											</CardTitle>
										</CardHeader>
										<CardContent>
											{organization.recentVotes ? <ScrollArea className='h-[300px] pr-4'>
												{organization.recentVotes.map(
													(vote: any) => (
														<div
															key={vote.id}
															className='mb-4 last:mb-0'>
															<div className='flex items-center justify-between p-4 rounded-lg bg-purple-500/10'>
																<div>
																	<h3 className='font-semibold text-purple-100'>
																		{
																			vote.title
																		}
																	</h3>
																	<Badge
																		variant={
																			vote.status ===
																			"Passed"
																				? "secondary"
																				: vote.status ===
																				  "Failed"
																				? "destructive"
																				: "outline"
																		}
																		className='mt-2'>
																		{
																			vote.status
																		}
																	</Badge>
																</div>
																<div className='text-right'>
																	<p className='text-sm text-green-400'>
																		For:{" "}
																		{
																			vote.votesFor
																		}
																	</p>
																	<p className='text-sm text-red-400'>
																		Against:{" "}
																		{
																			vote.votesAgainst
																		}
																	</p>
																</div>
															</div>
															<Separator className='my-4 bg-purple-500/20' />
														</div>
													)
												)}
											</ScrollArea> : <p className='text-purple-300 text-center'>No recent votes</p>}
										</CardContent>
									</Card>

									<Card className='bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10'>
										<CardHeader>
											<CardTitle className='text-2xl flex items-center text-purple-100'>
												<Calendar className='mr-2 h-6 w-6 text-purple-400' />
												Upcoming Votes
											</CardTitle>
										</CardHeader>
										<CardContent>
											{organization.upcomingVotes ? <ScrollArea className='h-[300px] pr-4'>
												{organization.upcomingVotes.map(
													(vote: any) => (
														<div
															key={vote.id}
															className='mb-4 last:mb-0'>
															<div className='flex items-center justify-between p-4 rounded-lg bg-purple-500/10'>
																<div>
																	<h3 className='font-semibold text-purple-100'>
																		{
																			vote.title
																		}
																	</h3>
																	<p className='text-sm text-purple-300 mt-1'>
																		Date:{" "}
																		{new Date(
																			vote.date
																		).toLocaleDateString()}
																	</p>
																</div>
																<Button
																	size='sm'
																	className='bg-purple-500 hover:bg-purple-600'>
																	View Details
																</Button>
															</div>
															<Separator className='my-4 bg-purple-500/20' />
														</div>
													)
												)}
											</ScrollArea> : <p className='text-purple-300 text-center'>No upcoming votes</p>}
										</CardContent>
									</Card>
								</div>
							</TabsContent>

							<TabsContent value='activity'>
								<Card className='bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10'>
									<CardHeader>
										<CardTitle className='text-2xl flex items-center text-purple-100'>
											<Activity className='mr-2 h-6 w-6 text-purple-400' />
											Recent Activities
										</CardTitle>
									</CardHeader>
									<CardContent>
										{organization.recentActivities ? <ScrollArea className='h-[400px] pr-4'>
											{organization.recentActivities.map(
												(activity: any) => (
													<div
														key={activity.id}
														className='mb-4 last:mb-0'>
														<div className='flex items-start space-x-4 p-4 rounded-lg bg-purple-500/10'>
															<div
																className={`p-2 rounded-full flex-shrink-0 bg-purple-500/20`}>
																{activity.type ===
																"proposal_created" ? (
																	<FileText className='h-5 w-5 text-purple-300' />
																) : activity.type ===
																  "funds_transferred" ? (
																	<Coins className='h-5 w-5 text-purple-300' />
																) : (
																	<Users className='h-5 w-5 text-purple-300' />
																)}
															</div>
															<div className='flex-grow'>
																<p className='font-medium text-purple-100'>
																	{
																		activity.description
																	}
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
												)
											)}
										</ScrollArea> : <p className='text-purple-300 text-center'>No activities yet</p>}
									</CardContent>
								</Card>
							</TabsContent>
						</Tabs>
					</div>
				</div>
			</div>

			<Outlet />
		</>
	);
}
