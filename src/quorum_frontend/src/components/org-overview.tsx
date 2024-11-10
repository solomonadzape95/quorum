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

const organizationData = {
  id: 1,
  name: "DAO Innovators",
  description:
    "A cutting-edge organization focused on blockchain innovation and decentralized governance.",
  profilePic: "/placeholder.svg?height=128&width=128",
  activeProposals: 3,
  treasury: 1500000,
  treasuryChange: 5.2,
  memberCount: 1200,
  memberChange: 3.1,
  memberActivity: 85,
  recentVotes: [
    {
      id: 1,
      title: "Upgrade smart contract",
      status: "Passed",
      votesFor: 800,
      votesAgainst: 150,
    },
    {
      id: 2,
      title: "Increase marketing budget",
      status: "Active",
      votesFor: 500,
      votesAgainst: 300,
    },
    {
      id: 3,
      title: "New partnership proposal",
      status: "Failed",
      votesFor: 400,
      votesAgainst: 600,
    },
  ],
  upcomingVotes: [
    { id: 1, title: "Q3 Budget Allocation", date: "2024-07-01" },
    { id: 2, title: "New Member Onboarding Process", date: "2024-07-15" },
  ],
  recentActivities: [
    {
      id: 1,
      type: "proposal_created",
      description: "New marketing strategy proposal",
      timestamp: "2024-06-10T14:30:00Z",
    },
    {
      id: 2,
      type: "funds_transferred",
      description: "50,000 USDC transferred to development fund",
      timestamp: "2024-06-09T10:15:00Z",
    },
    {
      id: 3,
      type: "member_joined",
      description: "Alice (0x1234...abcd) joined the organization",
      timestamp: "2024-06-08T16:45:00Z",
    },
  ],
};

export function OrganizationDetails() {
  const [activeTab, setActiveTab] = useState("overview");
  const { orgId } = useParams();
  const location = useLocation();
  // Enable dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);
  const isBasePath =
    location.pathname === `/dashboard/org/${orgId}`;
  return isBasePath ? (
    <div className="min-h-screen bg-[#0F0B15] bg-grid-small-white/[0.2] relative">
      <div className="absolute inset-0 bg-[#0F0B15]/80 pointer-events-none" />
      <div className="relative">
        <div className="container mx-auto p-8 space-y-8">
          <header className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-6">
              <Avatar className="w-24 h-24 border-4 border-purple-500 rounded flex justify-center items-center">
                <AvatarImage
                  src={organizationData.profilePic}
                  alt={organizationData.name}
                />
                <AvatarFallback>
                  {organizationData.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-500 bg-clip-text text-transparent">
                  {organizationData.name}
                </h1>
                <p className="text-purple-300 mt-2">
                  {organizationData.description}
                </p>
              </div>
            </div>
          </header>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="bg-purple-500/10 p-1">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="proposals"
                className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
              >
                Proposals & Votes
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
              >
                Recent Activity
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center text-purple-100">
                      <Coins className="mr-2 h-6 w-6 text-purple-400" />
                      Treasury
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <p className="text-3xl font-bold text-purple-100">
                        ${organizationData.treasury.toLocaleString()}
                      </p>
                      <Badge
                        variant="outline"
                        className={`flex items-center ${
                          organizationData.treasuryChange >= 0
                            ? "text-green-400 border-green-400"
                            : "text-red-400 border-red-400"
                        }`}
                      >
                        {organizationData.treasuryChange >= 0 ? (
                          <ArrowUpRight className="mr-1 h-4 w-4" />
                        ) : (
                          <ArrowDownRight className="mr-1 h-4 w-4" />
                        )}
                        {Math.abs(organizationData.treasuryChange)}%
                      </Badge>
                    </div>
                    <Progress value={75} className="h-2 bg-purple-500/20" />
                    <p className="text-sm text-purple-300">
                      75% of yearly budget utilized
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center text-purple-100">
                      <Users className="mr-2 h-6 w-6 text-purple-400" />
                      Membership
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <p className="text-3xl font-bold text-purple-100">
                        {organizationData.memberCount.toLocaleString()}
                      </p>
                      <Badge
                        variant="outline"
                        className={`flex items-center ${
                          organizationData.memberChange >= 0
                            ? "text-green-400 border-green-400"
                            : "text-red-400 border-red-400"
                        }`}
                      >
                        {organizationData.memberChange >= 0 ? (
                          <ArrowUpRight className="mr-1 h-4 w-4" />
                        ) : (
                          <ArrowDownRight className="mr-1 h-4 w-4" />
                        )}
                        {Math.abs(organizationData.memberChange)}%
                      </Badge>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm text-purple-300">
                          Member Activity
                        </p>
                        <span className="text-sm font-medium text-purple-100">
                          {organizationData.memberActivity}%
                        </span>
                      </div>
                      <Progress
                        value={organizationData.memberActivity}
                        className="h-2 bg-purple-500/20"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10 md:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center text-purple-100">
                      <Activity className="mr-2 h-6 w-6 text-purple-400" />
                      Quick Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-purple-500/10 p-4 rounded-lg">
                        <p className="text-sm text-purple-300 mb-1">
                          Active Proposals
                        </p>
                        <p className="text-2xl font-bold text-purple-100">
                          {organizationData.activeProposals}
                        </p>
                      </div>
                      <div className="bg-purple-500/10 p-4 rounded-lg">
                        <p className="text-sm text-purple-300 mb-1">
                          Total Votes Cast
                        </p>
                        <p className="text-2xl font-bold text-purple-100">
                          2,450
                        </p>
                      </div>
                      <div className="bg-purple-500/10 p-4 rounded-lg">
                        <p className="text-sm text-purple-300 mb-1">
                          Avg. Participation
                        </p>
                        <p className="text-2xl font-bold text-purple-100">
                          72%
                        </p>
                      </div>
                      <div className="bg-purple-500/10 p-4 rounded-lg">
                        <p className="text-sm text-purple-300 mb-1">
                          Execution Rate
                        </p>
                        <p className="text-2xl font-bold text-purple-100">
                          89%
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="proposals">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center text-purple-100">
                      <Vote className="mr-2 h-6 w-6 text-purple-400" />
                      Recent Votes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px] pr-4">
                      {organizationData.recentVotes.map((vote) => (
                        <div key={vote.id} className="mb-4 last:mb-0">
                          <div className="flex items-center justify-between p-4 rounded-lg bg-purple-500/10">
                            <div>
                              <h3 className="font-semibold text-purple-100">
                                {vote.title}
                              </h3>
                              <Badge
                                variant={
                                  vote.status === "Passed"
                                    ? "secondary"
                                    : vote.status === "Failed"
                                    ? "destructive"
                                    : "outline"
                                }
                                className="mt-2"
                              >
                                {vote.status}
                              </Badge>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-green-400">
                                For: {vote.votesFor}
                              </p>
                              <p className="text-sm text-red-400">
                                Against: {vote.votesAgainst}
                              </p>
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
                      <Calendar className="mr-2 h-6 w-6 text-purple-400" />
                      Upcoming Votes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[300px] pr-4">
                      {organizationData.upcomingVotes.map((vote) => (
                        <div key={vote.id} className="mb-4 last:mb-0">
                          <div className="flex items-center justify-between p-4 rounded-lg bg-purple-500/10">
                            <div>
                              <h3 className="font-semibold text-purple-100">
                                {vote.title}
                              </h3>
                              <p className="text-sm text-purple-300 mt-1">
                                Date: {new Date(vote.date).toLocaleDateString()}
                              </p>
                            </div>
                            <Button
                              size="sm"
                              className="bg-purple-500 hover:bg-purple-600"
                            >
                              View Details
                            </Button>
                          </div>
                          <Separator className="my-4 bg-purple-500/20" />
                        </div>
                      ))}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="activity">
              <Card className="bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center text-purple-100">
                    <Activity className="mr-2 h-6 w-6 text-purple-400" />
                    Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    {organizationData.recentActivities.map((activity) => (
                      <div key={activity.id} className="mb-4 last:mb-0">
                        <div className="flex items-start space-x-4 p-4 rounded-lg bg-purple-500/10">
                          <div
                            className={`p-2 rounded-full flex-shrink-0 bg-purple-500/20`}
                          >
                            {activity.type === "proposal_created" ? (
                              <FileText className="h-5 w-5 text-purple-300" />
                            ) : activity.type === "funds_transferred" ? (
                              <Coins className="h-5 w-5 text-purple-300" />
                            ) : (
                              <Users className="h-5 w-5 text-purple-300" />
                            )}
                          </div>
                          <div className="flex-grow">
                            <p className="font-medium text-purple-100">
                              {activity.description}
                            </p>
                            <p className="text-xs text-purple-400 mt-1">
                              {new Date(activity.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <Separator className="my-4 bg-purple-500/20" />
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  ) : (
    <Outlet />
  );
}
