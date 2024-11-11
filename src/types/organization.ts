export interface Organization {
  id: string;
  name: string;
  description: string[];
  members: string[];
  proposals: string[];
}

export interface OrganizationWithStats extends Organization {
  activeProposals: number;
  treasury: number;
  memberCount: number;
  memberActivity: number;
  treasuryChange: number;
  memberChange: number;
} 