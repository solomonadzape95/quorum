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
import OrganizationCreationForm from "@/components/forms/organizations";
import { useAppContext } from "@/contexts/AppContext";
import { Organization } from "@/types";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { quorum_backend } from "../../../declarations/quorum_backend";
import JoinOrgModal from "@/components/joinOrg";
import { useNavigate } from "react-router-dom";

// Mock data for user's organizations (empty array to simulate no organizations initially)
const initialOrganizations: Organization[] = [];

// Clean up mock data
const discoverableOrganizations: Organization[] = [
  {
    id: "4",
    name: "NACOS",
    description: "The official Decentralized Autonomous Organization for NACOS Students.",
    members: ["Ndukwe Peter", "Chinedu Okafor", "Matthew Okoronkwo"],
    electionConducted: [],
    pfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHM9RzrlQIxioB6TBZNCRQ52LCVtZO7ACTVw&s",
    isPublic: true,
    activeProposals: 4,
    treasury: 1200000,
    memberCount: 950,
    memberActivity: 78,
    treasuryChange: 3.5,
    memberChange: 2.8,
  },
  {
    id: "5",
    name: "ICP Hub",
    description: "The official Decentralized Autonomous Organization for ICP Hub Students in the University of Nigeria, Nsukka.",
    members: [],
    electionConducted: [],
    pfp: "https://cryptologos.cc/logos/internet-computer-icp-logo.png",
    isPublic: true,
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
  fetchOrganizations: () => void;
  
}

const ModalComponent: React.FC<ModalComponentProps> = ({ isOpen, onClose, fetchOrganizations}) => {
  const { globals } = useAppContext();

  const handleCreateOrg = async (name: string, description: string, admins: string[], pfp: string) => {
    try {
      console.log("Creating organization:", name, description, admins);
      
      // Create the organization
      const success = await quorum_backend.addOrgan(
        name,           // name
        true,          // isPublic
        description,    // description
        admins,        // members (initially just admins)
        [],            // electionConducted (empty initially)
        admins,        // admins
        pfp            // pfp
      );

      if (success && globals.principal) {
        // Add the organization to the user's list
        const joinSuccess = await quorum_backend.joinOrgan(
          globals.principal,
          name
        );

        if (joinSuccess) {
          // Refresh the organizations list
          fetchOrganizations();
          onClose();
          console.log("Organization created and joined successfully");
        } else {
          throw new Error("Failed to join organization");
        }
      } else {
        throw new Error("Failed to create organization");
      }
    } catch (error) {
      console.error("Failed to create/join organization:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-screen flex items-center justify-center z-50" >
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-screen backdrop-blur-sm bg-black/50 flex items-center justify-center -z-50" onClick={onClose}/>
      <div className="rounded-lg p-6 w-full max-w-md bg-[#0F0B15] border-purple-500/20 shadow-lg shadow-purple-500/10">
        <OrganizationCreationForm
          onSubmit={(name :string, description : string, admins : any, pfp: string) => handleCreateOrg(name, description, admins, pfp)}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

// Add more organizations to the demo data
const DEMO_ORGANIZATIONS = [
  {
    id: "1",
    name: "NACOS",
    description: "The official Decentralized Autonomous Organization for NACOS Students.",
    members: [
      {
        principalId: "abc123",
        username: "peter_ndukwe",
        role: "admin",
        joinedAt: "2024-01-15"
      },
      {
        principalId: "def456",
        username: "chinedu_okafor",
        role: "member",
        joinedAt: "2024-01-20"
      },
      {
        principalId: "ghi789",
        username: "matthew_oko",
        role: "member",
        joinedAt: "2024-02-01"
      }
    ],
    electionConducted: [],
    pfp: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHM9RzrlQIxioB6TBZNCRQ52LCVtZO7ACTVw&s",
    isPublic: true,
    activeProposals: 4,
    treasury: 1200000,
    memberCount: 950,
    memberActivity: 78,
    treasuryChange: 3.5,
    memberChange: 2.8,
  },
  {
    id: "2",
    name: "ICP Hub",
    description: "The official DAO for ICP Hub Students in UNN.",
    members: [
      {
        principalId: "jkl012",
        username: "sarah_dev",
        role: "admin",
        joinedAt: "2023-12-10"
      },
      {
        principalId: "mno345",
        username: "david_blockchain",
        role: "member",
        joinedAt: "2024-01-05"
      },
      {
        principalId: "pqr678",
        username: "alex_web3",
        role: "member",
        joinedAt: "2024-01-25"
      }
    ],
    electionConducted: [],
    pfp: "https://cryptologos.cc/logos/internet-computer-icp-logo.png",
    isPublic: true,
    activeProposals: 5,
    treasury: 3000000,
    memberCount: 2200,
    memberActivity: 88,
    treasuryChange: 10.2,
    memberChange: 5.7,
  },
  {
    id: "3",
    name: "Developer DAO",
    description: "A community of web3 developers building the future.",
    members: [
      {
        principalId: "stu901",
        username: "emma_tech",
        role: "admin",
        joinedAt: "2023-11-20"
      },
      {
        principalId: "vwx234",
        username: "james_coder",
        role: "member",
        joinedAt: "2023-12-15"
      },
      {
        principalId: "yz789a",
        username: "sophia_builder",
        role: "member",
        joinedAt: "2024-01-10"
      }
    ],
    electionConducted: [],
    pfp: "https://avatars.githubusercontent.com/u/88630056?s=200&v=4",
    isPublic: true,
    activeProposals: 8,
    treasury: 5000000,
    memberCount: 3500,
    memberActivity: 92,
    treasuryChange: 15.3,
    memberChange: 8.1,
  },
  {
    id: "4",
    name: "Web3 Writers",
    description: "A collective of technical writers and content creators in the Web3 space.",
    members: [],
    electionConducted: [],
    pfp: "https://pbs.twimg.com/profile_images/1639047772857761792/fZ_1KDf7_400x400.png",
    isPublic: true,
    activeProposals: 3,
    treasury: 800000,
    memberCount: 450,
    memberActivity: 82,
    treasuryChange: 5.2,
    memberChange: 4.1,
  },
  {
    id: "5",
    name: "DeFi Alliance",
    description: "Bringing together DeFi projects and developers to build the future of finance.",
    members: [],
    electionConducted: [],
    pfp: "https://assets.website-files.com/6364e65656ab107e465325d2/6364e65656ab10d1995325e8_defi-alliance.png",
    isPublic: true,
    activeProposals: 6,
    treasury: 4500000,
    memberCount: 1800,
    memberActivity: 85,
    treasuryChange: 8.7,
    memberChange: 3.9,
  },
  {
    id: "6",
    name: "NFT Creators Hub",
    description: "Supporting artists and creators in the NFT ecosystem.",
    members: [],
    electionConducted: [],
    pfp: "https://nftcreatorshub.com/assets/images/logo.png",
    isPublic: true,
    activeProposals: 7,
    treasury: 2800000,
    memberCount: 1200,
    memberActivity: 90,
    treasuryChange: 12.3,
    memberChange: 6.5,
  }
];

    export default function OrganizationsPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userOrganizations, setUserOrganizations] = useState<any>([]);
//   const [allOrgs, setAllOrgs] = useState<any>([]);
  const [discoveredOrgs, setDiscoveredOrgs] = useState<Organization[] | any>([]);
  const [user, setUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState<boolean>(false);
  const { globals } = useAppContext();
  const [visibleOrgCount, setVisibleOrgCount] = useState(3);
  const navigate = useNavigate();

  const fetchOrganizations = async () => {
    try {
      setIsLoading(true);

      if (globals.principal) {
        const user = await quorum_backend.getUser(globals.principal);
        if (user[0]) {
          setUser(user[0])
          console.log(user[0].organizations)
          
          const allUserOrgs = await Promise.all(user[0].organizations.map(async (orgName: string) => {
            const orgDataArray = await quorum_backend.getOrgan(orgName);
            return orgDataArray.map((org: any) => ({
              name: org.name,
              description: org.description,
              members: org.members,
              electionConducted: org.electionConducted,
              isPublic: org.isPublic,
              admins: org.admins,
              activeProposals: 0,
              treasury: 0,
              memberCount: org.members.length,
              memberActivity: 0,
              treasuryChange: 0,
              memberChange: 0,
              pfp: org.pfp || "https://picsum.photos/200"
            }));
          }));

          const flattenedOrgs = allUserOrgs.flat();
          console.log(flattenedOrgs)
          setUserOrganizations(flattenedOrgs);
        }

        setDiscoveredOrgs(DEMO_ORGANIZATIONS);
      }
    } catch (error) {
      console.error("Error fetching organizations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, [globals.principal]);
  const OrganizationCard = ({ org }: { org: Organization }) => {
    const { globals } = useAppContext();
    
    

    const roleColor = {
      Admin: "bg-red-500/20 text-red-300 hover:bg-red-500/30",
      Member: "bg-green-500/20 text-green-300 hover:bg-green-500/30"
    };

    const navigate = useNavigate();

    const handleViewDetails = () => {
      // Replace spaces with + in org name for URL
      const urlSafeOrgName = org.name.replace(/\s+/g, '+');
      navigate(`/dashboard/organizations/${urlSafeOrgName}`);
    };

    return (
      <Card className="bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center justify-between text-purple-100">
            <span className="flex items-center">
              <Avatar className="w-10 h-10 rounded-full overflow-hidden mr-2">
                <AvatarImage src={org.pfp} className="object-cover" />
              </Avatar>
              {org.name}
            </span>
            <div className="flex gap-2">
              {user && user.organizations.includes(org.name) ? ( 
                <Badge className={roleColor.Admin}>
                  Admin
                </Badge>
              ) : (
                <Badge className={roleColor.Member}>
                  Member
                </Badge>
              )}
              <Badge className="bg-purple-500/20 text-purple-300 hover:bg-purple-500/30">
                {org.activeProposals} Active Proposals
              </Badge>
            </div>
          </CardTitle>
          <CardDescription className="text-purple-300 mt-2">
            {org.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm text-purple-300">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{org.memberCount ? org.memberCount.toLocaleString() : '0'} members</span>
            </div>
            <div className="flex items-center gap-2">
              <Coins className="h-4 w-4" />
              <span>${org.treasury ? (org.treasury / 1000).toFixed(1) : '0'}k treasury</span>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button 
            className="w-full bg-purple-500 hover:bg-purple-600 text-white"
            onClick={handleViewDetails}
          >
            View Details
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-[#0F0B15] bg-grid-small-white/[0.2] relative">
      <div className="absolute inset-0 bg-[#0F0B15]/80 pointer-events-none" />
      <div className="relative">
        <div className="container mx-auto p-8 space-y-8">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-500 bg-clip-text text-transparent">
              My Organizations
            </h1>
            <div className="flex gap-4">
              <Button
                className="bg-purple-500 hover:bg-purple-600 text-white"
                onClick={() => setIsModalOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" /> Create Organization
              </Button>
              <Button 
                className="bg-purple-500 hover:bg-purple-600 text-white"
                onClick={() => setIsJoinModalOpen(true)}
              >
                <UserPlus className="mr-2 h-4 w-4" /> Join Organization
              </Button>
            </div>
          </header>

          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
            </div>
          ) : (
            <>
              {userOrganizations.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {userOrganizations.map((org:any,i:number) => (
                    <OrganizationCard key={i} org={org} />
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
                  {discoveredOrgs.length > 0 ? (
                    <>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {discoveredOrgs.slice(0, visibleOrgCount).map((org: any) => (
                          <OrganizationCard key={org.id} org={org} />
                        ))}
                      </div>
                      
                      {/* Add View More button */}
                      {visibleOrgCount < discoveredOrgs.length && (
                        <div className="mt-8 text-center">
                          <Button
                            variant="outline"
                            className="border-purple-500/20 text-purple-300 hover:bg-purple-500/10"
                            onClick={() => setVisibleOrgCount(prev => prev + 3)}
                          >
                            View More Organizations
                          </Button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center text-purple-300 py-4">
                      No organizations available for discovery at the moment.
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
      <ModalComponent
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        fetchOrganizations={fetchOrganizations}
      />
      <JoinOrgModal 
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
      />
    </div>
  );
}


