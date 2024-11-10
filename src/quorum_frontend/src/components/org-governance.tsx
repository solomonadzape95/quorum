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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
} from "lucide-react";

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

  // Enable dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

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
                    <ScrollArea className="h-[300px] pr-4">
                      {proposals
                        .filter((p) => p.status === "Active")
                        .map((proposal) => (
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
                    </ScrollArea>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
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
                    <ScrollArea className="h-[300px] pr-4">
                      {proposals
                        .filter((p) => p.status !== "Active")
                        .map((proposal) => (
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
                    </ScrollArea>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full border-purple-500 hover:bg-purple-500/20 text-purple-300"
                    >
                      View All Past Proposals
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
                    <ScrollArea className="h-[300px] pr-4">
                      {elections
                        .filter(
                          (e) =>
                            e.status === "Active" || e.status === "Upcoming"
                        )
                        .map((election) => (
                          <div key={election.id} className="mb-4 last:mb-0">
                            <div className="flex items-center justify-between p-4 rounded-lg bg-purple-500/10">
                              <div>
                                <h3 className="font-semibold text-purple-100">
                                  {election.title}
                                </h3>
                                <p className="text-sm text-purple-300 mt-1">
                                  Candidates: {election.candidates}
                                </p>
                                <p className="text-sm text-purple-300">
                                  Ends: {election.endDate}
                                </p>
                              </div>
                              <Badge
                                className={
                                  election.status === "Active"
                                    ? "bg-green-500/20 text-green-300"
                                    : "bg-yellow-500/20 text-yellow-300"
                                }
                              >
                                {election.status}
                              </Badge>
                            </div>
                            <Separator className="my-4 bg-purple-500/20" />
                          </div>
                        ))}
                    </ScrollArea>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                      View Candidate Profiles
                    </Button>
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
                    <ScrollArea className="h-[300px] pr-4">
                      {elections
                        .filter((e) => e.status === "Completed")
                        .map((election) => (
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
                    </ScrollArea>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      className="w-full border-purple-500 hover:bg-purple-500/20 text-purple-300"
                    >
                      View Full Election History
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
                    <ScrollArea className="h-[300px] pr-4">
                      {activeVotes.map((vote) => (
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
                    </ScrollArea>
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
