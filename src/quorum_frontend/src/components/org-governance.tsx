import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { quorum_backend } from "../../../declarations/quorum_backend";
import { Button } from "@/components/ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  PlusCircle,
  FileText,
  Vote,
  Users,
  ChevronLeft,
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
} from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ElectionCreationForm from "@/components/forms/elections";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

// Mock data
const proposals = [
  {
    id: 1,
    title: "Increase Marketing Budget",
    status: "Active",
    votes: { for: 120, against: 45 },
    endDate: "2024-07-15",
  },
  {
    id: 2,
    title: "New Partnership with Tech Corp",
    status: "Passed",
    votes: { for: 200, against: 30 },
    endDate: "2024-06-30",
  },
  {
    id: 3,
    title: "Community Event Funding",
    status: "Failed",
    votes: { for: 80, against: 150 },
    endDate: "2024-06-20",
  },
];

const elections = [
  {
    id: 1,
    title: "Board Member Election",
    status: "Active",
    candidates: 5,
    endDate: "2024-07-30",
  },
  {
    id: 2,
    title: "Treasury Manager Election",
    status: "Upcoming",
    candidates: 3,
    endDate: "2024-08-15",
  },
  {
    id: 3,
    title: "Community Representative",
    status: "Completed",
    winner: "Alice Johnson",
    endDate: "2024-06-10",
  },
];

const activeVotes = [
  {
    id: 1,
    title: "Proposal: Increase Marketing Budget",
    endDate: "2024-07-15",
  },
  { id: 2, title: "Board Member Election", endDate: "2024-07-30" },
];

export default function OrgGovernancePage() {
  const [activeTab, setActiveTab] = useState("proposals");
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>('')
  const [organization, setOrganization] = useState<any>(null)
const navigate = useNavigate()
const location = useLocation()
const { orgid } = useParams();
const [showElectionModal, setShowElectionModal] = useState(false);
const [elections, setElections] = useState<any[]>([]);
const [isLoadingElections, setIsLoadingElections] = useState(false);
const [electionError, setElectionError] = useState<string | null>(null);

	useEffect(() => {
		const fetchOrganizationData = async () => {
			try {
				setIsLoading(true);
				setError(null);
				// Convert URL-safe name back to original format
				const orgName = location.pathname.split('/')[3]?.replace(/\+/g, ' ');
				
				if (!orgName) {
					throw new Error('Organization name is required');
				}
                console.log(orgName, "orgName")

				const orgData = await quorum_backend.getOrgan(orgName);
				console.log(";hfjdsfdfdsn")
				if (orgData && orgData.length > 0) {
                    // Transform the data to match your UI needs
                    console.log(";efwfwfwfwf")
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
					console.log(transformedData, "transformedData")
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
	}, [location, navigate]);

  const fetchOrganizationElections = async () => {
    if (!organization) return;
    
    try {
        setIsLoadingElections(true);
        setElectionError(null);
        
        const electionIds = organization.electionConducted || [];
        
        const electionPromises = electionIds.map(async (electionId: string) => {
            const election : any= await quorum_backend.getElec(electionId);
            if (election) {
                const now = new Date();
                const startDate = new Date(election.startDate);
                const endDate = new Date(election.endDate);
                
                let status = "Upcoming";
                if (now > endDate) {
                    status = "Completed";
                } else if (now >= startDate && now <= endDate) {
                    status = "Active";
                }
                
                return {
                    ...election,
                    status,
                    id: electionId,
                    formattedStartDate: new Date(election.startDate).toLocaleDateString(),
                    formattedEndDate: new Date(election.endDate).toLocaleDateString()
                };
            }
            return null;
        });

        const electionResults = await Promise.all(electionPromises);
        const validElections = electionResults.filter(e => e !== null);
        
        setElections(validElections);
    } catch (error) {
        console.error("Error fetching elections:", error);
        setElectionError("Failed to load elections");
    } finally {
        setIsLoadingElections(false);
    }
  };

  useEffect(() => {
    fetchOrganizationElections();
  }, [organization]);

  const handleElectionCreate = async (formData: any) => {
    try {
        const contestants = formData.candidates.map((candidate: any, index: number) => ({
            contestantId: `${index + 1}`,
            name: candidate.name,
            description: candidate.mandate,
            tally: 0
        }));

        const electionId = `${organization.name}_${Date.now()}`;
        navigate(`/dashboard/organizations/${organization.name}/voting/`);
        // Format dates to ISO string
        const startDate = formData.startDate.toISOString();
        const endDate = formData.endDate.toISOString();

        const success = await quorum_backend.createElec(
            electionId,
            formData.description,
            contestants,
            startDate,
            endDate
        );

        if (success) {
            // Update the organization's electionConducted array
            const updatedElectionIds = [...(organization.electionConducted || []), electionId];
            await quorum_backend.updateOrgan(
                organization.name,
                [true],
                [],
                [],
                updatedElectionIds as any,
                []
            );
            
            setShowElectionModal(false);
            await fetchOrganizationElections();
        }
    } catch (error) {
        console.error("Error creating election:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0B15] bg-grid-small-white/[0.2] relative">
      <div className="absolute inset-0 bg-[#0F0B15]/80 pointer-events-none" />
      <div className="relative">
        <div className="container mx-auto p-8 space-y-8">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-500 bg-clip-text text-transparent">
              Governance Dashboard
            </h1>
          </header>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="bg-purple-500/10 p-1">
              <TabsTrigger
                value="proposals"
                className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
              >
                Proposal Management
              </TabsTrigger>
              <TabsTrigger
                value="elections"
                className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
              >
                Elections
              </TabsTrigger>
              <TabsTrigger
                value="voting"
                className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
              >
                Voting
              </TabsTrigger>
            </TabsList>

            <TabsContent value="proposals">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center text-purple-100">
                      <FileText className="mr-2 h-6 w-6 text-purple-400" />
                      Active Proposals
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                   {organization?.proposals ? <ScrollArea className="h-[300px] pr-4">
                      {organization?.proposals
                        .filter((p: any) => p.status === "Active")
                        .map((proposal: any) => (
                          <div key={proposal.id} className="mb-4 last:mb-0">
                            <div className="flex items-center justify-between p-4 rounded-lg bg-purple-500/10">
                              <div>
                                <h3 className="font-semibold text-purple-100">
                                  {proposal.title}
                                </h3>
                                <p className="text-sm text-purple-300 mt-1">
                                  Ends: {proposal.endDate}
                                </p>
                              </div>
                              <Badge className="bg-green-500/20 text-green-300">
                                Active
                              </Badge>
                            </div>
                            <Separator className="my-4 bg-purple-500/20" />
                          </div>
                        ))}
                    </ScrollArea> : <div>No active proposals</div>}
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white" disabled>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create New Proposal
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center text-purple-100">
                      <Clock className="mr-2 h-6 w-6 text-purple-400" />
                      Past Proposals
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                   {organization?.proposals ? <ScrollArea className="h-[300px] pr-4">
                      {organization?.proposals
                        .filter((p:any) => p.status !== "Active")
                        .map((proposal:any) => (
                          <div key={proposal.id} className="mb-4 last:mb-0">
                            <div className="flex items-center justify-between p-4 rounded-lg bg-purple-500/10">
                              <div>
                                <h3 className="font-semibold text-purple-100">
                                  {proposal.title}
                                </h3>
                                <p className="text-sm text-purple-300 mt-1">
                                  Ended: {proposal.endDate}
                                </p>
                              </div>
                              <Badge
                                className={
                                  proposal.status === "Passed"
                                    ? "bg-green-500/20 text-green-300"
                                    : "bg-red-500/20 text-red-300"
                                }
                              >
                                {proposal.status}
                              </Badge>
                            </div>
                            <Separator className="my-4 bg-purple-500/20" />
                          </div>
                        ))}
                    </ScrollArea> : <div>No past proposals</div>}
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full border-purple-500 hover:bg-purple-500/20 text-purple-300" disabled={!organization?.proposals}
                    >
                     {organization?.proposals ? 'View All Past Proposals' : 'No Past Proposals'}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="elections">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center text-purple-100">
                      <Vote className="mr-2 h-6 w-6 text-purple-400" />
                      Current Elections
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoadingElections ? (
                        <div className="flex justify-center items-center h-[300px]">
                            <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
                        </div>
                    ) : electionError ? (
                        <div className="text-red-400 text-center h-[300px] flex items-center justify-center">
                            {electionError}
                        </div>
                    ) : elections.length > 0 ? (
                        <ScrollArea className="h-[300px] pr-4">
                            {elections
                                .filter(e => e.status === "Active")
                                .map((election) => (
                                    <div key={election.id} className="mb-4 last:mb-0">
                                        <div className="flex items-center justify-between p-4 rounded-lg bg-purple-500/10">
                                            <div>
                                                <h3 className="font-semibold text-purple-100">
                                                    {election.description}
                                                </h3>
                                                <p className="text-sm text-purple-300 mt-1">
                                                    Candidates: {election.contestants.length}
                                                </p>
                                                <p className="text-sm text-purple-300">
                                                    {election.formattedStartDate} - {election.formattedEndDate}
                                                </p>
                                            </div>
                                            <Badge
                                                className={cn(
                                                    "bg-purple-500/20 text-purple-300",
                                                    election.status === "Active" && "bg-green-500/20 text-green-300",
                                                    election.status === "Completed" && "bg-gray-500/20 text-gray-300"
                                                )}
                                            >
                                                {election.status}
                                            </Badge>
                                        </div>
                                        <Separator className="my-4 bg-purple-500/20" />
                                    </div>
                                ))}
                        </ScrollArea>
                    ) : (
                        <div className="text-purple-300 text-center">No active elections</div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Dialog open={showElectionModal} onOpenChange={setShowElectionModal}>
                        <DialogTrigger asChild>
                            <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                                <PlusCircle className="mr-2 h-4 w-4" /> Create Election
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                            <ElectionCreationForm onSubmit={handleElectionCreate} />
                        </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>

                <Card className="bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center text-purple-100">
                      <Users className="mr-2 h-6 w-6 text-purple-400" />
                      Election History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                  {organization?.elections ? <ScrollArea className="h-[300px] pr-4">
                      {organization?.elections
                        .filter((e:any) => e.status === "Completed")
                        .map((election:any) => (
                          <div key={election.id} className="mb-4 last:mb-0">
                            <div className="flex items-center justify-between p-4 rounded-lg bg-purple-500/10">
                              <div>
                                <h3 className="font-semibold text-purple-100">
                                  {election.title}
                                </h3>
                                <p className="text-sm text-purple-300 mt-1">
                                  Winner: {election.winner}
                                </p>
                                <p className="text-sm text-purple-300">
                                  Ended: {election.endDate}
                                </p>
                              </div>
                              <Badge className="bg-blue-500/20 text-blue-300">
                                Completed
                              </Badge>
                            </div>
                            <Separator className="my-4 bg-purple-500/20" />
                          </div>
                        ))}
                    </ScrollArea> : <div>No election history</div>}
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full border-purple-500 hover:bg-purple-500/20 text-purple-300" disabled={!organization?.elections}
                    >
                     {organization?.elections ? 'View Full Election History' : 'No Election History'}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="voting">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center text-purple-100">
                      <Vote className="mr-2 h-6 w-6 text-purple-400" />
                      Active Votes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                   {organization?.votes ? <ScrollArea className="h-[300px] pr-4">
                      {activeVotes.map((vote:any) => (
                        <div key={vote.id} className="mb-4 last:mb-0">
                          <div className="flex items-center justify-between p-4 rounded-lg bg-purple-500/10">
                            <div>
                              <h3 className="font-semibold text-purple-100">
                                {vote.title}
                              </h3>
                              <p className="text-sm text-purple-300 mt-1">
                                Ends: {vote.endDate}
                              </p>
                            </div>
                            <Button
                              size="sm"
                              className="bg-purple-500 hover:bg-purple-600"
                            >
                              Cast Vote
                            </Button>
                          </div>
                          <Separator className="my-4 bg-purple-500/20" />
                        </div>
                      ))}
                    </ScrollArea> : <div>No active votes</div>}
                  </CardContent>
                </Card>

                <Card className="bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center text-purple-100">
                      <Users className="mr-2 h-6 w-6 text-purple-400" />
                      Voting Power Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-purple-300">
                          Your Voting Power
                        </span>
                        <span className="font-bold text-purple-100">
                          1,500 VP
                        </span>
                      </div>
                      <Progress value={75} className="h-2 bg-purple-500/20" />
                      <p className="text-sm text-purple-300">
                        You are in the top 25% of voters
                      </p>
                      <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white mt-4">
                        Delegate Voting Power
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
