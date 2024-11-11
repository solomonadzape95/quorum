// User related types

export interface UserOrganization {
  orgId: string;
  role: 'ADMIN' | 'MEMBER';
}

export interface UserVotingHistory {
  id: number;
  vote: 'For' | 'Against';
  result: 'Passed' | 'Failed';
  date: string;
}

export interface Delegation {
  from?: string;
  to?: string;
  amount: number;
  timestamp: string;
}

export interface DelegationState {
  received: Delegation[];
  given: Delegation[];
}

export interface UserData {
  username: string;
  displayName: string;
  pfp: string;
  principalId: string;
  organizations: UserOrganization[];
  elections: string[];  // Array of election IDs
  proposals: UserVotingHistory[];
  delegations?: DelegationState;
}

// Organization related types
export interface TreasuryTransaction {
  date: string;
  amount: number;
  change: number;
  description: string;
}

export interface Treasury {
  balance: number;
  history: TreasuryTransaction[];
}

export interface OrganizationMetrics {
  memberCount: number;
  activeProposals: number;
  memberActivity: number;
  treasuryChange: number;
  memberChange: number;
}

export interface OrganizationMember {
  principalId: string;
  role: 'ADMIN' | 'MEMBER';
}

export interface Organization {
  id: string;
  name: string;
  handle: string;
  pfp: string;
  isPublic: boolean;
  description: string;
  members: OrganizationMember[];
  electionConducted?: string[];  // Array of election IDs
  treasury?: Treasury;
  metrics?: OrganizationMetrics;
}

// Election related types
export interface Contestant {
  contestantId: string;
  name: string;
  description: string;
  tally: number;
  winner?: boolean;
}

export interface Election {
  electionId: string;
  organizationId: string;
  description: string;
  status: 'ACTIVE' | 'COMPLETED';
  startDate: string;
  endDate: string;
  contestants: Contestant[];
  votingHistory?: UserVotingHistory[];
}

// Proposal related types
export interface ProposalVoter {
  principalId: string;
  vote: 'For' | 'Against';
  votingPower: number;
}

export interface Proposal {
  id: number;
  organizationId: string;
  title: string;
  description: string;
  status: 'Active' | 'Passed' | 'Failed';
  startDate: string;
  endDate?: string;
  votesFor: number;
  votesAgainst: number;
  voters: ProposalVoter[];
}

// Analytics related types
export interface OrganizationAnalytics {
  memberCount: number;
  activeProposals: number;
  completedProposals: number;
  activeElections: number;
  treasuryBalance: number;
  treasuryChange: number;
  memberActivity: number;
}

export interface VotingTrend {
  date: string;
  participation: number;
  forVotes: number;
  againstVotes: number;
}

export interface VotingStatistics {
  averageParticipation: number;
  proposalSuccessRate: number;
  votingTrends: VotingTrend[];
}

// API Response types
export type ApiResponse<T> = T | null;

// Request types
export interface CreateOrganizationRequest {
  name: string;
  isPublic: boolean;
  description: string;
  members: OrganizationMember[];
}

export interface CreateElectionRequest {
  description: string;
  endDate: string;
  contestants: Omit<Contestant, 'contestantId' | 'tally'>[];
}

export interface CreateProposalRequest {
  title: string;
  description: string;
  endDate: string;
}

export interface CastVoteRequest {
  proposalId: number;
  vote: 'For' | 'Against';
}

export interface DelegateVotesRequest {
  toPrincipalId: string;
  amount: number;
}

// Enum types
export enum UserRole {
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN'
}

export enum ElectionStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}

export enum ProposalStatus {
  ACTIVE = 'Active',
  PASSED = 'Passed',
  FAILED = 'Failed'
}
const API_URL = 'http://localhost:3001'; // json-server default URL

// Helper function for fetch calls
const fetchWithError = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

// User CRUD Operations
export const userService = {
  // Create
  createUser: async (userData: Omit<UserData, 'organizations' | 'elections'>): Promise<UserData> => {
    try {
      const newUser = {
        ...userData,
        organizations: [],
        elections: []
      };
      return await fetchWithError(`${API_URL}/users`, {
        method: 'POST',
        body: JSON.stringify(newUser)
      });
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Read
  getUserById: async (principalId: string): Promise<UserData | null> => {
    try {
      const response = await fetchWithError(`${API_URL}/users?principalId=${principalId}`);
      return response[0] || null;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },
  
  getUsersByOrganization: async (orgId: string): Promise<UserData[]> => {
    try {
      const response = await fetchWithError(`${API_URL}/users`);
      return response.filter((user: UserData) => 
        user.organizations?.some((org: UserOrganization) => org.orgId === orgId)
      );
    } catch (error) {
      console.error('Error fetching organization users:', error);
      throw error;
    }
  },

  // Update
//   updateUserProfile: async (principalId: string, updates: Partial<UserData>): Promise<UserData> => {
//     try {
//       const user = await userService.getUserById(principalId);
//       if (!user) throw new Error('User not found');

//       const updatedUser = {
//         ...user,
//         ...updates
//       };
//       return await fetchWithError(`${API_URL}/users/${principalId}`, {
//         method: 'PUT',
//         body: JSON.stringify(updatedUser)
//       });
//     } catch (error) {
//       console.error('Error updating user:', error);
//       throw error;
//     }
//   },

//   updateUserRole: async (principalId: string, orgId: string, newRole: UserRole): Promise<UserData> => {
//     try {
//       const user = await userService.getUserById(principalId);
//       if (!user) throw new Error('User not found');

//       const updatedOrganizations = user.organizations?.map(org:any => 
//         org.orgId === orgId ? { ...org, role: newRole } : org
//       );

//       return await fetchWithError(`${API_URL}/users/${principalId}`, {
//         method: 'PATCH',
//         body: JSON.stringify({ organizations: updatedOrganizations })
//       });
//     } catch (error) {
//       console.error('Error updating user role:', error);
//       throw error;
//     }
//   },

  // Delete
//   deleteUser: async (principalId: string): Promise<void> => {
//     try {
//       const orgs = await organizationService.getOrganizationsByMember(principalId);
//       await Promise.all(orgs.map((org: Organization) => 
//         organizationService.updateOrganization(org.id, {
//           members: org.members.filter((member: OrganizationMember) => member.principalId !== principalId)
//         })
//       ));

//       await fetchWithError(`${API_URL}/users/${principalId}`, {
//         method: 'DELETE'
//       });
//     } catch (error) {
//       console.error('Error deleting user:', error);
//       throw error;
//     }
//   },

  checkAndCreateUser: async (principalId: string): Promise<UserData> => {
    try {
      // First try to get the user
      const response = await fetch(`${API_URL}/users?principalId=${principalId}`);
      const users = await response.json();

      // If user exists, return it
      if (users.length > 0) {
        return users[0];
      }

      // If user doesn't exist, create new user
      const newUser = {
        principalId,
        createdAt: new Date().toISOString(),
        organizations: [],
        delegations: {
          given: [],
          received: []
        },
        notifications: [],
        votingHistory: []
      };

      const createResponse = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser)
      });

      if (!createResponse.ok) {
        throw new Error('Failed to create user');
      }

      return await createResponse.json();
    } catch (error) {
      console.error('Error in checkAndCreateUser:', error);
      throw error;
    }
  }
};

// Organization CRUD Operations
export const organizationService:any = {
  // Create
  createOrganization: async (orgData: Omit<Organization, 'id'>): Promise<Organization> => {
    try {
      const newOrg = {
        ...orgData,
        metrics: {
          memberCount: orgData.members.length,
          activeProposals: 0,
          memberActivity: 0,
          treasuryChange: 0,
          memberChange: 0
        },
        treasury: {
          balance: 0,
          history: []
        }
      };
      return await fetchWithError(`${API_URL}/organizations`, {
        method: 'POST',
        body: JSON.stringify(newOrg)
      });
    } catch (error) {
      console.error('Error creating organization:', error);
      throw error;
    }
  },

  // Read
  getOrganizationById: async (orgId: string): Promise<Organization | null> => {
    try {
      return await fetchWithError(`${API_URL}/organizations/${orgId}`);
    } catch (error) {
      console.error('Error fetching organization:', error);
      throw error;
    }
  },

    getOrganizationsByMember: async (principalId: string): Promise<Organization[]> => {
    try {
      const response = await fetchWithError(`${API_URL}/organizations`);
      return response.filter((org: Organization) => 
        org.members.some(member => member.principalId === principalId)
      );
    } catch (error) {
      console.error('Error fetching member organizations:', error);
      throw error;
    }
  },

  // Update
  updateOrganization: async (orgId: string, updates: Partial<Organization>): Promise<Organization> => {
    try {
      return await fetchWithError(`${API_URL}/organizations/${orgId}`, {
        method: 'PATCH',
        body: JSON.stringify(updates)
      });
    } catch (error) {
      console.error('Error updating organization:', error);
      throw error;
    }
  },

//   updateTreasury: async (orgId: string, amount: number, description: string): Promise<Organization> => {
//     try {
//       const org = await organizationService.getOrganizationById(orgId);
//       if (!org) throw new Error('Organization not found');

//       const newBalance = org.treasury.balance + amount;
//       const transaction = {
//         date: new Date().toISOString(),
//         amount: newBalance,
//         change: amount,
//         description
//       };

//       const updatedTreasury = {
//         balance: newBalance,
//         history: [...org.treasury.history, transaction]
//       };

//       return await organizationService.updateOrganization(orgId, {
//         treasury: updatedTreasury,
//         metrics: {
//           ...org.metrics,
//           treasuryChange: (amount / org.treasury.balance) * 100
//         }
//       });
//     } catch (error) {
//       console.error('Error updating treasury:', error);
//       throw error;
//     }
//   },

  // Add this new method

  getPublicOrganizations: async (): Promise<Organization[]> => {
    try {
      const response = await fetchWithError(`${API_URL}/organizations`);
      return response.filter((org: Organization) => org.isPublic);
    } catch (error) {
      console.error('Error fetching public organizations:', error);
      throw error;
    }
  },
};// ... previous services ...

// Election CRUD Operations
export const electionService = {
  // Create
  createElection: async (orgId: string, electionData: Omit<Election, 'electionId'>): Promise<Election> => {
    try {
      const newElection = {
        ...electionData,
        electionId: `election_${Date.now()}`,
        organizationId: orgId,
        status: 'ACTIVE',
        startDate: new Date().toISOString(),
        contestants: electionData.contestants || [],
        votingHistory: []
      };
      
      const election = await fetchWithError(`${API_URL}/elections`, {
        method: 'POST',
        body: JSON.stringify(newElection)
      });

      // Update organization's election list
      const org = await organizationService.getOrganizationById(orgId);
      if (org) {
        await organizationService.updateOrganization(orgId, {
          electionConducted: [...(org.electionConducted || []), election.electionId]
        });
      }

      return election;
    } catch (error) {
      console.error('Error creating election:', error);
      throw error;
    }
  },

  // Read
  getElectionById: async (electionId: string): Promise<Election | null> => {
    try {
      return await fetchWithError(`${API_URL}/elections/${electionId}`);
    } catch (error) {
      console.error('Error fetching election:', error);
      throw error;
    }
  },

  getOrganizationElections: async (orgId: string): Promise<Election[]> => {
    try {
      return await fetchWithError(`${API_URL}/elections?organizationId=${orgId}`);
    } catch (error) {
      console.error('Error fetching organization elections:', error);
      throw error;
    }
  },

  getActiveElections: async (orgId: string): Promise<Election[]> => {
    try {
      return await fetchWithError(`${API_URL}/elections?organizationId=${orgId}&status=ACTIVE`);
    } catch (error) {
      console.error('Error fetching active elections:', error);
      throw error;
    }
  },

  // Update
  updateContestantTally: async (electionId: string, contestantId: string, votes: number): Promise<Election> => {
    try {
      const election = await electionService.getElectionById(electionId);
      if (!election) throw new Error('Election not found');

      const updatedContestants = election.contestants.map(contestant =>
        contestant.contestantId === contestantId
          ? { ...contestant, tally: contestant.tally + votes }
          : contestant
      );

      return await fetchWithError(`${API_URL}/elections/${electionId}`, {
        method: 'PATCH',
        body: JSON.stringify({ contestants: updatedContestants })
      });
    } catch (error) {
      console.error('Error updating contestant tally:', error);
      throw error;
    }
  }
};

// Proposal CRUD Operations
export const proposalService = {
  // Create
  createProposal: async (orgId: string, proposalData: Omit<Proposal, 'id'>): Promise<Proposal> => {
    try {
      const newProposal = {
        ...proposalData,
        organizationId: orgId,
        status: 'Active',
        startDate: new Date().toISOString(),
        votesFor: 0,
        votesAgainst: 0,
        voters: []
      };

      const proposal = await fetchWithError(`${API_URL}/proposals`, {
        method: 'POST',
        body: JSON.stringify(newProposal)
      });

      // Update organization metrics
      const org = await organizationService.getOrganizationById(orgId);
      if (org && org.metrics) {
        await organizationService.updateOrganization(orgId, {
          metrics: {
            ...org.metrics,
            activeProposals: (org.metrics.activeProposals || 0) + 1
          }
        });
      }

      return proposal;
    } catch (error) {
      console.error('Error creating proposal:', error);
      throw error;
    }
  },

  // Read
  getProposalById: async (proposalId: number): Promise<Proposal | null> => {
    try {
      return await fetchWithError(`${API_URL}/proposals/${proposalId}`);
    } catch (error) {
      console.error('Error fetching proposal:', error);
      throw error;
    }
  },

  getOrganizationProposals: async (orgId: string): Promise<Proposal[]> => {
    try {
      return await fetchWithError(`${API_URL}/proposals?organizationId=${orgId}`);
    } catch (error) {
      console.error('Error fetching organization proposals:', error);
      throw error;
    }
  },

  // Update
  castVote: async (
    proposalId: number, 
    principalId: string, 
    vote: 'For' | 'Against', 
    votingPower: number
  ): Promise<Proposal> => {
    try {
      const proposal = await proposalService.getProposalById(proposalId);
      if (!proposal) throw new Error('Proposal not found');

      if (proposal.voters.some(voter => voter.principalId === principalId)) {
        throw new Error('User has already voted');
      }

      const updatedProposal = {
        ...proposal,
        votesFor: vote === 'For' ? proposal.votesFor + votingPower : proposal.votesFor,
        votesAgainst: vote === 'Against' ? proposal.votesAgainst + votingPower : proposal.votesAgainst,
        voters: [...proposal.voters, { principalId, vote, votingPower }]
      };

      return await fetchWithError(`${API_URL}/proposals/${proposalId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedProposal)
      });
    } catch (error) {
      console.error('Error casting vote:', error);
      throw error;
    }
  }
};

// Voting and Delegation Operations
export const votingService = {
//   delegateVotes: async (fromPrincipalId: string, toPrincipalId: string, amount: number): Promise<void> => {
//     try {
//       const user = await userService.getUserById(fromPrincipalId);
//       if (!user) throw new Error('User not found');

//       const delegation = {
//         from: fromPrincipalId,
//         to: toPrincipalId,
//         amount,
//         timestamp: new Date().toISOString()
//       };

//       // Update delegator's delegations
//       await fetchWithError(`${API_URL}/users/${fromPrincipalId}`, {
//         method: 'PATCH',
//         body: JSON.stringify({
//           delegations: {
//             given: [...(user.delegations?.given || []), delegation]
//           }
//         })
//       });

//       // Update recipient's delegations
//       const recipient = await userService.getUserById(toPrincipalId);
//       if (recipient) {
//         await fetchWithError(`${API_URL}/users/${toPrincipalId}`, {
//           method: 'PATCH',
//           body: JSON.stringify({
//             delegations: {
//               received: [...(recipient.delegations?.received || []), delegation]
//             }
//           })
//         });
//       }
//     } catch (error) {
//       console.error('Error delegating votes:', error);
//       throw error;
//     }
//   },

//   calculateVotingPower: async (principalId: string, orgId: string): Promise<number> => {
//     try {
//       const user = await userService.getUserById(principalId);
//       if (!user) throw new Error('User not found');

//       const org = await organizationService.getOrganizationById(orgId);
//       const userRole = org?.members.find((member: OrganizationMember) => member.principalId === principalId)?.role;
//       let votingPower = userRole === 'ADMIN' ? 2 : 1;

//       const receivedDelegations = user.delegations?.received || [];
//       const delegatedPower = receivedDelegations.reduce((total: number, delegation: Delegation) => total + delegation.amount, 0);

//       return votingPower + delegatedPower;
//     } catch (error) {
//       console.error('Error calculating voting power:', error);
//       throw error;
//     }
//   }
};

// Analytics Service
export const analyticsService = {
  getOrganizationMetrics: async (orgId: string) => {
    try {
      const org = await organizationService.getOrganizationById(orgId);
      if (!org) throw new Error('Organization not found');

      const [proposals, elections] = await Promise.all([
        fetchWithError(`${API_URL}/proposals?organizationId=${orgId}`),
        fetchWithError(`${API_URL}/elections?organizationId=${orgId}`)
      ]);

      return {
        memberCount: org.members.length,
        activeProposals: proposals.filter((p: Proposal) => p.status === 'Active').length,
        completedProposals: proposals.filter((p: Proposal) => p.status !== 'Active').length,
        activeElections: elections.filter((e: Election) => e.status === 'ACTIVE').length,
        treasuryBalance: org.treasury.balance,
        treasuryChange: org.metrics.treasuryChange,
        memberActivity: calculateMemberActivity(proposals, org.members.length)
      };
    } catch (error) {
      console.error('Error getting organization metrics:', error);
      throw error;
    }
  },

  getVotingStatistics: async (orgId: string) => {
    try {
      const proposals = await fetchWithError(`${API_URL}/proposals?organizationId=${orgId}`);
      const totalVotes = proposals.reduce((sum:number, p:any) => sum + p.votesFor + p.votesAgainst, 0);
      const totalProposals = proposals.length;
      
      return {
        averageParticipation: totalProposals > 0 ? (totalVotes / totalProposals) : 0,
        proposalSuccessRate: calculateProposalSuccessRate(proposals),
        votingTrends: calculateVotingTrends(proposals)
      };
    } catch (error) {
      console.error('Error getting voting statistics:', error);
      throw error;
    }
  }
};

// Helper functions for analytics (unchanged)
function calculateMemberActivity(proposals: Proposal[], memberCount: number): number {
  if (memberCount === 0) return 0;
  const uniqueVoters = new Set(proposals.flatMap((p:any) => p.voters.map((v:any) => v.principalId)));
  return (uniqueVoters.size / memberCount) * 100;
}

function calculateProposalSuccessRate(proposals: Proposal[]): number {
  const completedProposals = proposals.filter(p => p.status !== 'Active');
  if (completedProposals.length === 0) return 0;
  
  const passedProposals = completedProposals.filter(p => p.status === 'Passed');
  return (passedProposals.length / completedProposals.length) * 100;
}

function calculateVotingTrends(proposals: Proposal[]) {
  return proposals
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .map(p => ({
      date: p.startDate,
      participation: p.voters.length,
      forVotes: p.votesFor,
      againstVotes: p.votesAgainst
    }));
}