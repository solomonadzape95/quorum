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
import { organizationService,userService } from "@/services/dbService";

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
}

const ModalComponent: React.FC<ModalComponentProps> = ({ isOpen, onClose }) => {
        const handleCreateOrg = async (name: string, isPublic: boolean, description: string, members: string[], elections: string[]) => {
            try {
                console.log("Creating organization:", name, isPublic, description, members, elections);
            // const result = await quorum_backend.addOrgan(
            //     name,
            //     isPublic,
            //     description,
            //     members,
            //     elections
            // );
            onClose();
            console.log("Organization created:");
            } catch (error) {
            console.error("Failed to create organization:", error);
            }
        };

        if (!isOpen) return null;

        return (
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-screen flex items-center justify-center z-50" >
                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-screen backdrop-blur-sm bg-black/50 flex items-center justify-center -z-50" onClick={onClose}/>
            <div className="rounded-lg p-6 w-full max-w-md bg-[#0F0B15] border-purple-500/20 shadow-lg shadow-purple-500/10">
                <OrganizationCreationForm
                onSubmit={(name, description, admins) => handleCreateOrg(name, true, description, admins, [])}
                onClose={onClose}
                />
            </div>
            </div>
        );
};

export default function OrganizationsPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userOrganizations, setUserOrganizations] = useState<any>([]);
  const [allOrgs, setAllOrgs] = useState<any>([]);
  const [discoveredOrgs, setDiscoveredOrgs] = useState<Organization[]>([]);
  const [user, setUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { globals } = useAppContext();  

  // Fetch user's organizations and discoverable organizations
  useEffect(() => {

    const getUser = async () => {
      const user = await userService.getUserById(globals.principal || '');
      console.log(user)
      setUser(user);
    //   return user;
    }

    getUser();


    const fetchOrganizations = async () => {
        try {
          setIsLoading(true);
       
          const res = await organizationService.getPublicOrganizations();
          if(!res) throw new Error("Error");
          console.log(res)
          setAllOrgs(res)
          return res
      } catch (error) {
        console.error("Failed to fetch organizations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  useEffect(()=>{
const discOrg = allOrgs.filter((org: any) => 
            !org.members.some((member: any) => member.principalId === user?.principalId)
          );
        //   console.log(discOrg)
          const userOrg = allOrgs.filter((org: any) => 
            org.members.some((member: any) => member.principalId === user?.principalId)
          );
          console.log(userOrg,discOrg)
          if(globals.principal){
            setDiscoveredOrgs(discOrg)
            setUserOrganizations(userOrg)
          }
  },[allOrgs,user])

  const OrganizationCard = ({ org }: { org: Organization }) => (
    <Card className="bg-black/40 border-purple-500/20 shadow-lg shadow-purple-500/10">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center justify-between text-purple-100">
          <span className="flex items-center">
            <Avatar className="w-10 h-10 rounded-full overflow-hidden mr-2">
              <AvatarImage src={org.pfp} className="object-cover" />
              <AvatarFallback>{org.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {org.name}
          </span>
          <Badge className="bg-purple-500/20 text-purple-300 hover:bg-purple-500/30">
            {org.activeProposals} Active Proposals
          </Badge>
        </CardTitle>
      </CardHeader>
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
            <div className="flex gap-4">
              <Button
                className="bg-purple-500 hover:bg-purple-600 text-white"
                onClick={() => setIsModalOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" /> Create Organization
              </Button>
              <Button className="bg-purple-500 hover:bg-purple-600 text-white">
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
                  {userOrganizations.map((org:any) => (
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {discoveredOrgs.map((org) => (
                        <OrganizationCard key={org.id} org={org} />
                      ))}
                    </div>
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
        //   handleOrganizationCreated();
        }}
      />
    </div>
  );
}
