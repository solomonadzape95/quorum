import { useEffect, useState } from "react";
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
  Footprints,
  Users,
  Briefcase,
  FileText,
  Coins,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  UserPlus,
  Loader2,
} from "lucide-react";
// import { Modal } from "@/components/ui/modal";

interface Organization {
  id: number;
  name: string;
  activeProposals: number;
  treasury: number;
  memberCount: number;
  memberActivity: number;
  treasuryChange: number;
  memberChange: number;
}

// Mock data for user's organizations (empty array to simulate no organizations initially)
const initialOrganizations: Organization[] = [];

// Mock data for discoverable organizations
const discoverableOrganizations: Organization[] = [
  {
    id: 3,
    name: "Blockchain Governance",
    activeProposals: 2,
    treasury: 2000000,
    memberCount: 1500,
    memberActivity: 91,
    treasuryChange: 7.8,
    memberChange: 4.2,
  },
  {
    id: 4,
    name: "Crypto Commons",
    activeProposals: 4,
    treasury: 1200000,
    memberCount: 950,
    memberActivity: 78,
    treasuryChange: 3.5,
    memberChange: 2.8,
  },
  {
    id: 5,
    name: "DeFi Pioneers",
    activeProposals: 5,
    treasury: 3000000,
    memberCount: 2200,
    memberActivity: 88,
    treasuryChange: 10.2,
    memberChange: 5.7,
  },
];

interface ModalComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose}>Close</button>
        <h2>Create Organization</h2>
      </div>
    </div>
  );
};

export default function OrganizationsPage() {
  const [organizations, setOrganizations] =
    useState<Organization[]>(initialOrganizations);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [discoveredOrgs, setDiscoveredOrgs] = useState<Organization[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Enable dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // Simulate loading organizations after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setOrganizations([
        {
          id: 1,
          name: "DAO Innovators",
          activeProposals: 3,
          treasury: 1500000,
          memberCount: 1200,
          memberActivity: 85,
          treasuryChange: 5.2,
          memberChange: 3.1,
        },
        {
          id: 2,
          name: "Decentralized Collective",
          activeProposals: 1,
          treasury: 800000,
          memberCount: 800,
          memberActivity: 72,
          treasuryChange: -2.1,
          memberChange: 1.5,
        },
      ]);
    }, 2000); // Simulate a 2-second loading time

    return () => clearTimeout(timer);
  }, []);

  // Simulate discovering new organizations
  const handleDiscoverOrganizations = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setDiscoveredOrgs(discoverableOrganizations);
    }, 2000);
  };

  const OrganizationCard = ({ org }: { org: Organization }) => (
    <Card className="bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center justify-between text-purple-100">
          <span className="flex items-center">
            <Briefcase className="mr-2 h-6 w-6 text-purple-400" />
            {org.name}
          </span>
          <Badge className="bg-purple-500/20 text-purple-300 hover:bg-purple-500/30">
            {org.activeProposals} Active Proposals
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-purple-300">Treasury Balance</p>
            <p className="text-2xl font-bold text-purple-100">
              ${org.treasury.toLocaleString()}
            </p>
          </div>
          <Badge
            variant="outline"
            className={`flex items-center ${
              org.treasuryChange >= 0
                ? "text-green-400 border-green-400"
                : "text-red-400 border-red-400"
            }`}
          >
            {org.treasuryChange >= 0 ? (
              <ArrowUpRight className="mr-1 h-4 w-4" />
            ) : (
              <ArrowDownRight className="mr-1 h-4 w-4" />
            )}
            {Math.abs(org.treasuryChange)}%
          </Badge>
        </div>
        <Separator className="bg-purple-500/20" />
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-purple-300">Member Count</p>
            <p className="text-2xl font-bold text-purple-100">
              {org.memberCount.toLocaleString()}
            </p>
          </div>
          <Badge
            variant="outline"
            className={`flex items-center ${
              org.memberChange >= 0
                ? "text-green-400 border-green-400"
                : "text-red-400 border-red-400"
            }`}
          >
            {org.memberChange >= 0 ? (
              <ArrowUpRight className="mr-1 h-4 w-4" />
            ) : (
              <ArrowDownRight className="mr-1 h-4 w-4" />
            )}
            {Math.abs(org.memberChange)}%
          </Badge>
        </div>
        <Separator className="bg-purple-500/20" />
        <div>
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-purple-300">Member Activity</p>
            <span className="text-sm font-medium text-purple-100">
              {org.memberActivity}%
            </span>
          </div>
          <Progress
            value={org.memberActivity}
            className="h-2 bg-purple-500/20"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div className="min-h-screen bg-[#0F0B15] bg-grid-small-white/[0.2] relative">
      <div className="absolute inset-0 bg-[#0F0B15]/80 pointer-events-none" />
      <div className="relative">
        <div className="container mx-auto p-8 space-y-8">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-500 bg-clip-text text-transparent">
              Your Organizations
            </h1>
          </header>

          {organizations.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {organizations.map((org) => (
                <OrganizationCard key={org.id} org={org} />
              ))}
            </div>
          ) : (
            <Card className="bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10">
              <CardHeader>
                <CardTitle className="text-2xl text-purple-100">
                  No Organizations Yet
                </CardTitle>
                <CardDescription className="text-purple-300">
                  You're not a member of any organizations. Create or join one
                  to get started!
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="flex-1 bg-purple-500 hover:bg-purple-600 text-white"
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" /> Create Organization
                </Button>
                <Button className="flex-1 bg-purple-500 hover:bg-purple-600 text-white">
                  <UserPlus className="mr-2 h-4 w-4" /> Join Organization
                </Button>
              </CardContent>
            </Card>
          )}

          <Card className="bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10 mt-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center text-purple-100">
                <Footprints className="mr-2 h-6 w-6 text-purple-400" />
                Discover New Organizations
              </CardTitle>
              <CardDescription className="text-purple-300">
                Explore and join new organizations that align with your
                interests.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center h-32">
                  <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
                </div>
              ) : discoveredOrgs.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {discoveredOrgs.map((org) => (
                    <OrganizationCard key={org.id} org={org} />
                  ))}
                </div>
              ) : (
                <Button
                  onClick={handleDiscoverOrganizations}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                >
                  Discover Organizations
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <ModalComponent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
