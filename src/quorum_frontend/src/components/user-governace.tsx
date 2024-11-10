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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronLeft,
  Vote,
  History,
  Users,
  FileText,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

// Mock data
const activeProposals = [
  {
    id: 1,
    title: "Increase Marketing Budget",
    endDate: "2024-07-15",
    votesFor: 120,
    votesAgainst: 45,
  },
  {
    id: 2,
    title: "New Partnership with Tech Corp",
    endDate: "2024-07-20",
    votesFor: 80,
    votesAgainst: 30,
  },
  {
    id: 3,
    title: "Community Event Funding",
    endDate: "2024-07-25",
    votesFor: 150,
    votesAgainst: 20,
  },
];

const votingHistory = [
  {
    id: 1,
    title: "Upgrade Smart Contract",
    vote: "For",
    result: "Passed",
    date: "2024-06-10",
  },
  {
    id: 2,
    title: "Treasury Reallocation",
    vote: "Against",
    result: "Failed",
    date: "2024-06-05",
  },
  {
    id: 3,
    title: "New Governance Model",
    vote: "For",
    result: "Passed",
    date: "2024-05-28",
  },
];

const delegations = {
  received: [
    {
      id: 1,
      from: "Alice",
      amount: 5000,
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      from: "Bob",
      amount: 3000,
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ],
  given: [
    {
      id: 1,
      to: "Carol",
      amount: 2000,
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ],
};

const personalProposals = [
  {
    id: 1,
    title: "Implement Quadratic Voting",
    status: "Active",
    votesFor: 80,
    votesAgainst: 20,
  },
  {
    id: 2,
    title: "Increase Quorum Threshold",
    status: "Passed",
    votesFor: 150,
    votesAgainst: 50,
  },
  {
    id: 3,
    title: "Create Education Fund",
    status: "Failed",
    votesFor: 70,
    votesAgainst: 100,
  },
];

export default function UserGovernancePage() {
  const [activeTab, setActiveTab] = useState("active-proposals");

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
              My Governance
            </h1>
          </header>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="bg-purple-500/10 p-1">
              <TabsTrigger
                value="active-proposals"
                className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
              >
                Active Proposals
              </TabsTrigger>
              <TabsTrigger
                value="voting-history"
                className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
              >
                Voting History
              </TabsTrigger>
              <TabsTrigger
                value="delegations"
                className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
              >
                Delegations
              </TabsTrigger>
              <TabsTrigger
                value="personal-proposals"
                className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
              >
                Personal Proposals
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active-proposals">
              <Card className="bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center text-purple-100">
                    <Vote className="mr-2 h-6 w-6 text-purple-400" />
                    Active Proposals
                  </CardTitle>
                  <CardDescription className="text-purple-300">
                    Cast your vote on current proposals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    {activeProposals.map((proposal) => (
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
                          <div className="flex items-center space-x-2">
                            <Badge className="bg-green-500/20 text-green-300">
                              {proposal.votesFor} For
                            </Badge>
                            <Badge className="bg-red-500/20 text-red-300">
                              {proposal.votesAgainst} Against
                            </Badge>
                            <Button
                              size="sm"
                              className="bg-purple-500 hover:bg-purple-600"
                            >
                              Vote
                            </Button>
                          </div>
                        </div>
                        <Separator className="my-4 bg-purple-500/20" />
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="voting-history">
              <Card className="bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center text-purple-100">
                    <History className="mr-2 h-6 w-6 text-purple-400" />
                    Voting History
                  </CardTitle>
                  <CardDescription className="text-purple-300">
                    Your past votes and their outcomes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    {votingHistory.map((vote) => (
                      <div key={vote.id} className="mb-4 last:mb-0">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-purple-500/10">
                          <div>
                            <h3 className="font-semibold text-purple-100">
                              {vote.title}
                            </h3>
                            <p className="text-sm text-purple-300 mt-1">
                              Voted on: {vote.date}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge
                              className={
                                vote.vote === "For"
                                  ? "bg-green-500/20 text-green-300"
                                  : "bg-red-500/20 text-red-300"
                              }
                            >
                              {vote.vote}
                            </Badge>
                            <Badge
                              className={
                                vote.result === "Passed"
                                  ? "bg-green-500/20 text-green-300"
                                  : "bg-red-500/20 text-red-300"
                              }
                            >
                              {vote.result}
                            </Badge>
                          </div>
                        </div>
                        <Separator className="my-4 bg-purple-500/20" />
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="delegations">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center text-purple-100">
                      <ArrowDownRight className="mr-2 h-6 w-6 text-purple-400" />
                      Received Delegations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px] pr-4">
                      {delegations.received.map((delegation) => (
                        <div key={delegation.id} className="mb-4 last:mb-0">
                          <div className="flex items-center justify-between p-4 rounded-lg bg-purple-500/10">
                            <div className="flex items-center space-x-4">
                              <Avatar className="h-10 w-10">
                                <AvatarImage
                                  src={delegation.avatar}
                                  alt={delegation.from}
                                />
                                <AvatarFallback>
                                  {delegation.from.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold text-purple-100">
                                  {delegation.from}
                                </h3>
                                <p className="text-sm text-purple-300">
                                  Delegated: {delegation.amount} votes
                                </p>
                              </div>
                            </div>
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
                      <ArrowUpRight className="mr-2 h-6 w-6 text-purple-400" />
                      Given Delegations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px] pr-4">
                      {delegations.given.map((delegation) => (
                        <div key={delegation.id} className="mb-4 last:mb-0">
                          <div className="flex items-center justify-between p-4 rounded-lg bg-purple-500/10">
                            <div className="flex items-center space-x-4">
                              <Avatar className="h-10 w-10">
                                <AvatarImage
                                  src={delegation.avatar}
                                  alt={delegation.to}
                                />
                                <AvatarFallback>
                                  {delegation.to.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold text-purple-100">
                                  {delegation.to}
                                </h3>
                                <p className="text-sm text-purple-300">
                                  Delegated: {delegation.amount} votes
                                </p>
                              </div>
                            </div>
                          </div>
                          <Separator className="my-4 bg-purple-500/20" />
                        </div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="personal-proposals">
              <Card className="bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center text-purple-100">
                    <FileText className="mr-2 h-6 w-6 text-purple-400" />
                    Your Proposals
                  </CardTitle>
                  <CardDescription className="text-purple-300">
                    Proposals you've submitted
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    {personalProposals.map((proposal) => (
                      <div key={proposal.id} className="mb-4 last:mb-0">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-purple-500/10">
                          <div>
                            <h3 className="font-semibold text-purple-100">
                              {proposal.title}
                            </h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge
                                className={
                                  proposal.status === "Active"
                                    ? "bg-blue-500/20 text-blue-300"
                                    : proposal.status === "Passed"
                                    ? "bg-green-500/20 text-green-300"
                                    : "bg-red-500/20 text-red-300"
                                }
                              >
                                {proposal.status}
                              </Badge>
                              <span className="text-sm text-purple-300">
                                {proposal.votesFor} For /{" "}
                                {proposal.votesAgainst} Against
                              </span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-purple-500 hover:bg-purple-500/20"
                          >
                            View Details
                          </Button>
                        </div>
                        <Separator className="my-4 bg-purple-500/20" />
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-purple-500 hover:bg-purple-600">
                    Create New Proposal
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
