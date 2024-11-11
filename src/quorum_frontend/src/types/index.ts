// User related types
export interface UserData {
    username: string;
    displayName: string;
    pfp: string;
    principalId: string;
    organizations?: Organization[];
    elections?: Election[];
}

// Organization related types
export interface Organization {
    id: string;
    name: string;
    pfp: string;
    isPublic: boolean;
    description: string;
    members: string[];
    electionConducted: string[];
    // Add these fields that are used in your components
    activeProposals?: number;
    treasury?: number;
    memberCount?: number;
    memberActivity?: number;
    treasuryChange?: number;
    memberChange?: number;
}

// Election related types
export interface Contestant {
    contestantId: string;
    name: string;
    description: string;
    tally: number;
}

export interface Proposal {
    id: number;
    title: string;
    status: 'Active' | 'Passed' | 'Failed';
    votesFor: number;
    votesAgainst: number;
    endDate?: string;
}

export interface Election {
    electionId: string;
    description: string;
    proposals: Proposal[];
    contestants: Contestant[];
    votingHistory?: {
        id: number;
        title: string;
        vote: 'For' | 'Against';
        result: 'Passed' | 'Failed';
        date: string;
    }[];
    delegations?: {
        received: {
            id: number;
            from: string;
            amount: number;
            avatar: string;
        }[];
        given: {
            id: number;
            to: string;
            amount: number;
            avatar: string;
        }[];
    };
}

// API Response types (since Motoko returns optional types)
type ApiResponse<T> = T | null;

// You might also want some request types for your API calls
interface UpdateUserRequest {
    principalId: string;
    displayName?: string;
    organizations?: string[];
    elections?: string[];
}

export interface CreateOrganizationRequest {
    name: string;
    isPublic: boolean;
    description: string;
    members: string[];
    electionConducted: string[];
}

export interface CreateElectionRequest {
    electionId: string;
    description: string;
    contestants: Contestant[];
}

// Enums for any status or state management
export enum UserRole {
    MEMBER = 'member',
    ADMIN = 'admin'
}

export enum ElectionStatus {
    PENDING = 'pending',
    ACTIVE = 'active',
    COMPLETED = 'completed'
}


/**
 * 
 * export interface UserData {
  principalId: string;
  createdAt: string;
  organizations: UserOrganization[];
  delegations: {
    given: Delegation[];
    received: Delegation[];
  };
  notifications: Notification[];
  votingHistory: VoteRecord[];
}

// Make sure these interfaces are also defined
export interface UserOrganization {
  orgId: string;
  role: string;
  joinedAt: string;
}

export interface Delegation {
  from: string;
  to: string;
  amount: number;
  timestamp: string;
}

export interface Notification {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface VoteRecord {
  proposalId: string;
  vote: string;
  timestamp: string;
} 
 */