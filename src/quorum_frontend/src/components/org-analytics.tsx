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
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeft,
  BarChart,
  PieChart,
  TrendingUp,
  Users,
  Activity,
  DollarSign,
} from "lucide-react";
import {
  Bar,
  BarChart as RechartsBarChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock data
const governanceData = [
  { name: "Jan", participation: 65 },
  { name: "Feb", participation: 59 },
  { name: "Mar", participation: 80 },
  { name: "Apr", participation: 81 },
  { name: "May", participation: 56 },
  { name: "Jun", participation: 55 },
  { name: "Jul", participation: 40 },
];

const treasuryData = [
  { name: "Development", value: 400000 },
  { name: "Marketing", value: 300000 },
  { name: "Operations", value: 200000 },
  { name: "Community", value: 100000 },
];

const memberActivityData = [
  { name: "Very Active", value: 30 },
  { name: "Active", value: 45 },
  { name: "Occasional", value: 20 },
  { name: "Inactive", value: 5 },
];

export default function OrgAnalyticsPage() {
  const [activeTab, setActiveTab] = useState("governance");

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
              Analytics Dashboard
            </h1>
          </header>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="bg-purple-500/10 p-1">
              <TabsTrigger
                value="governance"
                className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
              >
                Governance Statistics
              </TabsTrigger>
              <TabsTrigger
                value="treasury"
                className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
              >
                Treasury Analytics
              </TabsTrigger>
              <TabsTrigger
                value="members"
                className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"
              >
                Member Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="governance">
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
                      <RechartsBarChart data={governanceData}>
                        <XAxis dataKey="name" stroke="#a78bfa" />
                        <YAxis stroke="#a78bfa" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1f1635",
                            border: "none",
                          }}
                          itemStyle={{ color: "#e9d5ff" }}
                        />
                        <Bar dataKey="participation" fill="#7c3aed" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center text-purple-100">
                      <PieChart className="mr-2 h-6 w-6 text-purple-400" />
                      Proposal Success Rate
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
                            strokeDasharray={75 * 2.51327}
                            strokeDashoffset={
                              75 * 2.51327 - (75 / 100) * 75 * 2.51327
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
                            75%
                          </span>
                        </div>
                      </div>
                      <p className="mt-4 text-purple-300">
                        75 out of 100 proposals passed
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="treasury">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center text-purple-100">
                      <DollarSign className="mr-2 h-6 w-6 text-purple-400" />
                      Fund Allocation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsBarChart data={treasuryData} layout="vertical">
                        <XAxis type="number" stroke="#a78bfa" />
                        <YAxis
                          dataKey="name"
                          type="category"
                          stroke="#a78bfa"
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1f1635",
                            border: "none",
                          }}
                          itemStyle={{ color: "#e9d5ff" }}
                        />
                        <Bar dataKey="value" fill="#7c3aed" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center text-purple-100">
                      <TrendingUp className="mr-2 h-6 w-6 text-purple-400" />
                      Treasury Growth
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-purple-300">Current Balance</span>
                        <span className="text-2xl font-bold text-purple-100">
                          $1,000,000
                        </span>
                      </div>
                      <Progress value={75} className="h-2 bg-purple-500/20" />
                      <div className="flex justify-between text-sm text-purple-300">
                        <span>+$250,000 this month</span>
                        <span>25% increase</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="members">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center text-purple-100">
                      <Users className="mr-2 h-6 w-6 text-purple-400" />
                      Member Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RechartsBarChart data={memberActivityData}>
                        <XAxis dataKey="name" stroke="#a78bfa" />
                        <YAxis stroke="#a78bfa" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1f1635",
                            border: "none",
                          }}
                          itemStyle={{ color: "#e9d5ff" }}
                        />
                        <Bar dataKey="value" fill="#7c3aed" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center text-purple-100">
                      <Activity className="mr-2 h-6 w-6 text-purple-400" />
                      Engagement Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-purple-300">
                            Proposal Participation
                          </span>
                          <span className="font-semibold text-purple-100">
                            78%
                          </span>
                        </div>
                        <Progress value={78} className="h-2 bg-purple-500/20" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-purple-300">
                            Forum Activity
                          </span>
                          <span className="font-semibold text-purple-100">
                            62%
                          </span>
                        </div>
                        <Progress value={62} className="h-2 bg-purple-500/20" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-purple-300">
                            Task Completion
                          </span>
                          <span className="font-semibold text-purple-100">
                            85%
                          </span>
                        </div>
                        <Progress value={85} className="h-2 bg-purple-500/20" />
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
