import { extractGitHubRepo } from "../../lib/utils";
import {
  fetchGitHubContributions,
  type GitHubProfileStats,
  type GitHubRepoStats,
} from "../../lib/github";

export type { GitHubRepoStats };

const GITHUB_HEADERS = (token?: string) => ({
  Accept: "application/vnd.github+json",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

async function fetchRepoStats(
  owner: string,
  repo: string
): Promise<GitHubRepoStats | null> {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: GITHUB_HEADERS(process.env.GITHUB_TOKEN),
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

export async function fetchGitHubProfileStatsData(
  username: string
): Promise<GitHubProfileStats | null> {
  try {
    const [userRes, contributions] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: GITHUB_HEADERS(process.env.GITHUB_TOKEN),
      }),
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

export async function handleGitHubGet(url: string | null) {
  if (!url) {
    return Response.json({ error: "url parameter required" }, { status: 400 });
  }

  const repo = extractGitHubRepo(url);
  if (!repo) {
    return Response.json(null);
  }

  const stats = await fetchRepoStats(repo.owner, repo.repo);
  return Response.json(stats);
}

export async function handleGitHubActivityGet(username: string | null) {
  if (!username) {
    return Response.json({ error: "username parameter required" }, { status: 400 });
  }

  const stats = await fetchGitHubProfileStatsData(username);
  if (!stats) {
    return Response.json({ error: "Unable to fetch GitHub activity" }, { status: 502 });
  }

  return Response.json(stats);
}
