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
import {
  ChevronLeft,
  BarChart,
  PieChart,
  TrendingUp,
  Star,
  Activity,
  ThumbsUp,
  MessageSquare,
} from "lucide-react";
import {
  Bar,
  BarChart as RechartsBarChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

// Mock data
const participationData = [
  { month: "Jan", rate: 65 },
  { month: "Feb", rate: 59 },
  { month: "Mar", rate: 80 },
  { month: "Apr", rate: 81 },
  { month: "May", rate: 56 },
  { month: "Jun", rate: 55 },
  { month: "Jul", rate: 40 },
];

const votingImpactData = [
  { proposal: "Proposal 1", impact: 75 },
  { proposal: "Proposal 2", impact: 60 },
  { proposal: "Proposal 3", impact: 85 },
  { proposal: "Proposal 4", impact: 40 },
  { proposal: "Proposal 5", impact: 90 },
];

const contributionHistory = [
  {
    id: 1,
    type: "Proposal",
    title: "Implement Quadratic Voting",
    date: "2024-06-15",
    impact: 85,
  },
  {
    id: 2,
    type: "Comment",
    title: "Feedback on Treasury Management",
    date: "2024-06-10",
    impact: 40,
  },
  {
    id: 3,
    type: "Vote",
    title: "Community Event Funding",
    date: "2024-06-05",
    impact: 60,
  },
  {
    id: 4,
    type: "Task",
    title: "Documentation Update",
    date: "2024-05-28",
    impact: 75,
  },
];

export default function UserAnalyticsPage() {
  const [activeTab, setActiveTab] = useState("participation");

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
              Analytics
            </h1>
          </header>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="bg-purple-500/10 p-1">
              <TabsTrigger
                value="participation"
                className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
              >
                Participation Metrics
              </TabsTrigger>
              <TabsTrigger
                value="voting-impact"
                className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
              >
                Voting Impact
              </TabsTrigger>
              <TabsTrigger
                value="contribution"
                className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
              >
                Contribution History
              </TabsTrigger>
              <TabsTrigger
                value="reputation"
                className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
              >
                Reputation Score
              </TabsTrigger>
            </TabsList>

            <TabsContent value="participation">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center text-purple-100">
                      <BarChart className="mr-2 h-6 w-6 text-purple-400" />
                      Participation Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={participationData}>
                        <XAxis dataKey="month" stroke="#a78bfa" />
                        <YAxis stroke="#a78bfa" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1f1635",
                            border: "none",
                          }}
                          itemStyle={{ color: "#e9d5ff" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="rate"
                          stroke="#7c3aed"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center text-purple-100">
                      <Activity className="mr-2 h-6 w-6 text-purple-400" />
                      Activity Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-purple-300">Votes Cast</span>
                          <span className="font-semibold text-purple-100">
                            45
                          </span>
                        </div>
                        <Progress value={75} className="h-2 bg-purple-500/20" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-purple-300">
                            Proposals Created
                          </span>
                          <span className="font-semibold text-purple-100">
                            3
                          </span>
                        </div>
                        <Progress value={30} className="h-2 bg-purple-500/20" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-purple-300">Comments Made</span>
                          <span className="font-semibold text-purple-100">
                            28
                          </span>
                        </div>
                        <Progress value={60} className="h-2 bg-purple-500/20" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="voting-impact">
              <Card className="bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center text-purple-100">
                    <TrendingUp className="mr-2 h-6 w-6 text-purple-400" />
                    Voting Impact Analysis
                  </CardTitle>
                  <CardDescription className="text-purple-300">
                    Your influence on recent proposals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <RechartsBarChart data={votingImpactData}>
                      <XAxis dataKey="proposal" stroke="#a78bfa" />
                      <YAxis stroke="#a78bfa" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f1635",
                          border: "none",
                        }}
                        itemStyle={{ color: "#e9d5ff" }}
                      />
                      <Bar dataKey="impact" fill="#7c3aed" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contribution">
              <Card className="bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center text-purple-100">
                    <Star className="mr-2 h-6 w-6 text-purple-400" />
                    Contribution History
                  </CardTitle>
                  <CardDescription className="text-purple-300">
                    Your recent contributions and their impact
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    {contributionHistory.map((contribution) => (
                      <div key={contribution.id} className="mb-4 last:mb-0">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-purple-500/10">
                          <div>
                            <h3 className="font-semibold text-purple-100">
                              {contribution.title}
                            </h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge
                                className={
                                  contribution.type === "Proposal"
                                    ? "bg-blue-500/20 text-blue-300"
                                    : contribution.type === "Comment"
                                    ? "bg-green-500/20 text-green-300"
                                    : contribution.type === "Vote"
                                    ? "bg-yellow-500/20 text-yellow-300"
                                    : "bg-purple-500/20 text-purple-300"
                                }
                              >
                                {contribution.type}
                              </Badge>
                              <span className="text-sm text-purple-300">
                                {contribution.date}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-semibold text-purple-100">
                              Impact:
                            </span>
                            <Progress
                              value={contribution.impact}
                              className="w-20 h-2 bg-purple-500/20"
                            />
                          </div>
                        </div>
                        <Separator className="my-4 bg-purple-500/20" />
                      </div>
                    ))}
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reputation">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center text-purple-100">
                      <Star className="mr-2 h-6 w-6 text-purple-400" />
                      Reputation Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center h-[300px]">
                      <div className="relative w-48 h-48">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle
                            className="text-purple-500/20"
                            strokeWidth="10"
                            stroke="currentColor"
                            fill="transparent"
                            r="40"
                            cx="50"
                            cy="50"
                          />
                          <circle
                            className="text-purple-500"
                            strokeWidth="10"
                            strokeDasharray={80 * 2.51327}
                            strokeDashoffset={
                              80 * 2.51327 - (80 / 100) * 80 * 2.51327
                            }
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r="40"
                            cx="50"
                            cy="50"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-4xl font-bold text-purple-100">
                            80
                          </span>
                        </div>
                      </div>
                      <p className="mt-4 text-purple-300">
                        Excellent Contributor
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center text-purple-100">
                      <Activity className="mr-2 h-6 w-6 text-purple-400" />
                      Reputation Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-purple-300">
                            Voting Consistency
                          </span>
                          <span className="font-semibold text-purple-100">
                            85%
                          </span>
                        </div>
                        <Progress value={85} className="h-2 bg-purple-500/20" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-purple-300">
                            Proposal Quality
                          </span>
                          <span className="font-semibold text-purple-100">
                            75%
                          </span>
                        </div>
                        <Progress value={75} className="h-2 bg-purple-500/20" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-purple-300">
                            Community Engagement
                          </span>
                          <span className="font-semibold text-purple-100">
                            90%
                          </span>
                        </div>
                        <Progress value={90} className="h-2 bg-purple-500/20" />
                      </div>
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
