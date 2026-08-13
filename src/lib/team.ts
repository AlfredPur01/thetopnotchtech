import { backendFetch } from "@/lib/server/backend-client";

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: string;
  linkedin: string;
  twitter: string;
}

interface BackendTeamMember {
  name: string;
  role: string;
  bio: string | null;
  avatar_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
}

function fromBackend(row: BackendTeamMember): TeamMember {
  return {
    name: row.name,
    role: row.role,
    bio: row.bio ?? "",
    photo: row.avatar_url ?? "",
    linkedin: row.linkedin_url ?? "",
    twitter: row.twitter_url ?? "",
  };
}

/** Visible team members in display order — backend already filters/sorts. */
export async function getTeamMembers(): Promise<TeamMember[]> {
  const { members } = await backendFetch<{ members: BackendTeamMember[] }>("/team");
  return members.map(fromBackend);
}
