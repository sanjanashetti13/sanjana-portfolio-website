import { extractGitHubRepo } from "./utils";

export const GITHUB_USERNAME = "sanjanashetti13";

export type GitHubRepoStats = {
  stars: number;
  language: string | null;
  updatedAt: string;
};

export type GitHubProfileStats = {
  username: string;
  profileUrl: string;
  publicRepos: number;
  followers: number;
  following: number;
  totalContributions: number;
};

export type GitHubContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type GitHubContributionsResponse = {
  totalContributions: number;
  contributions: GitHubContributionDay[];
};

const GITHUB_HEADERS = { Accept: "application/vnd.github+json" };
const CONTRIBUTIONS_API = "https://github-contributions-api.jogruber.de/v4";

async function fetchFromGitHub(
  owner: string,
  repo: string
): Promise<GitHubRepoStats | null> {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: GITHUB_HEADERS,
    });
    if (!response.ok) return null;
    const data = await response.json();
    return {
      stars: data.stargazers_count ?? 0,
      language: data.language ?? null,
      updatedAt: data.updated_at ?? "",
    };
  } catch {
    return null;
  }
}

function sumContributions(contributions: Array<{ count: number }>): number {
  return contributions.reduce((total, day) => total + day.count, 0);
}

export async function fetchGitHubContributions(
  username: string
): Promise<GitHubContributionsResponse> {
  const response = await fetch(`${CONTRIBUTIONS_API}/${username}?y=last`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      typeof data?.error === "string"
        ? data.error
        : `Failed to fetch GitHub contributions for "${username}".`
    );
  }

  const contributions = (data.contributions ?? []) as GitHubContributionDay[];

  return {
    contributions,
    totalContributions: sumContributions(contributions),
  };
}

async function fetchProfileStatsDirect(username: string): Promise<GitHubProfileStats | null> {
  try {
    const [userRes, contributions] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers: GITHUB_HEADERS }),
      fetchGitHubContributions(username).catch(() => null),
    ]);

    if (!userRes.ok) return null;

    const user = await userRes.json();

    return {
      username: user.login,
      profileUrl: user.html_url,
      publicRepos: user.public_repos ?? 0,
      followers: user.followers ?? 0,
      following: user.following ?? 0,
      totalContributions: contributions?.totalContributions ?? 0,
    };
  } catch {
    return null;
  }
}

export function extractGitHubUsername(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== "github.com") return null;
    const segment = parsed.pathname.split("/").filter(Boolean)[0];
    return segment ?? null;
  } catch {
    return null;
  }
}

export async function fetchGitHubStats(url: string): Promise<GitHubRepoStats | null> {
  if (!url || url === "#") return null;

  try {
    const apiRes = await fetch(`/api/github?url=${encodeURIComponent(url)}`);
    if (apiRes.ok) {
      const data = await apiRes.json();
      if (data) return data;
    }
  } catch {
    // fall through to direct fetch
  }

  const repo = extractGitHubRepo(url);
  if (!repo) return null;
  return fetchFromGitHub(repo.owner, repo.repo);
}

export async function fetchGitHubProfileStats(
  username: string = GITHUB_USERNAME
): Promise<GitHubProfileStats | null> {
  try {
    const apiRes = await fetch(`/api/github-activity?username=${encodeURIComponent(username)}`);
    if (apiRes.ok) {
      const data = await apiRes.json();
      if (data && !data.error) return data as GitHubProfileStats;
    }
  } catch {
    // fall through
  }

  return fetchProfileStatsDirect(username);
}
