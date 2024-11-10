import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, Search, Users } from "lucide-react";

// Mock data for members
const members = [
  {
    id: 1,
    name: "Alice Johnson",
    username: "@alice_j",
    role: "Admin",
    pfp: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Bob Smith",
    username: "@bobsmith",
    role: "Moderator",
    pfp: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Carol Williams",
    username: "@carol_w",
    role: "Member",
    pfp: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "David Brown",
    username: "@davebrown",
    role: "Member",
    pfp: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Eva Martinez",
    username: "@evam",
    role: "Contributor",
    pfp: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    name: "Frank Lee",
    username: "@franklee",
    role: "Member",
    pfp: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 7,
    name: "Grace Kim",
    username: "@grace_k",
    role: "Contributor",
    pfp: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 8,
    name: "Henry Nguyen",
    username: "@henry_n",
    role: "Member",
    pfp: "/placeholder.svg?height=40&width=40",
  },
];

export default function OrgMembersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Enable dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0F0B15] bg-grid-small-white/[0.2] relative">
      <div className="absolute inset-0 bg-[#0F0B15]/80 pointer-events-none" />
      <div className="relative">
        <div className="container mx-auto p-8 space-y-8">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-500 bg-clip-text text-transparent">
              Organization Members
            </h1>
          </header>

          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-400" />
              <span className="text-lg font-semibold text-purple-100">
                Total Members: {members.length}
              </span>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400" />
              <Input
                type="text"
                placeholder="Search members..."
                className="pl-10 bg-purple-500/10 border-purple-500/20 text-purple-100 placeholder-purple-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-250px)]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map((member) => (
                <Card
                  key={member.id}
                  className="bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10"
                >
                  <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.pfp} alt={member.name} />
                      <AvatarFallback>
                        {member.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg font-semibold text-purple-100">
                        {member.name}
                      </CardTitle>
                      <p className="text-sm text-purple-300">
                        {member.username}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Badge
                      className={
                        member.role === "Admin"
                          ? "bg-red-500/20 text-red-300"
                          : member.role === "Moderator"
                          ? "bg-yellow-500/20 text-yellow-300"
                          : member.role === "Contributor"
                          ? "bg-green-500/20 text-green-300"
                          : "bg-blue-500/20 text-blue-300"
                      }
                    >
                      {member.role}
                    </Badge>
                    <Button
                      variant="ghost"
                      className="w-full mt-4 hover:bg-purple-500/20 text-purple-300"
                    >
                      View Profile
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
