// Fetches the user's top GitHub repositories (by star count) for the
// Projects section. Runs server-side only (Next.js fetch cache), so no
// token is exposed to the browser. An optional GITHUB_TOKEN raises the
// otherwise-low unauthenticated rate limit — see README.

export type GithubRepo = {
  name: string;
  title: string;
  description: string;
  htmlUrl: string;
  homepage: string | null;
  stars: number;
  forks: number;
  language: string | null;
  topics: string[];
  updatedAt: string;
};

type RawRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  private: boolean;
  pushed_at: string;
};

// Turns "my-cool-repo" into "My Cool Repo".
function humanize(name: string): string {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// Repo descriptions sometimes carry Markdown (links, emphasis) meant for
// the GitHub UI — strip it down to plain text for the card.
function stripMarkdown(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // [label](url) -> label
    .replace(/[*_`]/g, "")
    .trim();
}

/**
 * Fetches `username`'s public, non-fork repos from the GitHub REST API,
 * sorted by star count (ties broken by most recently pushed), and returns
 * the top `limit`. Returns `[]` on any failure — callers should fall back
 * to static data rather than let a GitHub outage break the page.
 */
export async function getTopRepos(
  username: string,
  limit = 6
): Promise<GithubRepo[]> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(
      `https://api.github.com/users/${username}/repos?type=owner&sort=pushed&per_page=100`,
      {
        headers,
        // Revalidate hourly — stars don't need to be live-live, and this
        // keeps us well under the API's rate limit.
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      console.error(`GitHub API error for ${username}: ${res.status}`);
      return [];
    }

    const repos = (await res.json()) as RawRepo[];

    return repos
      .filter((r) => !r.fork && !r.archived && !r.private)
      .sort((a, b) => {
        if (b.stargazers_count !== a.stargazers_count) {
          return b.stargazers_count - a.stargazers_count;
        }
        return (
          new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
        );
      })
      .slice(0, limit)
      .map((r) => ({
        name: r.name,
        title: humanize(r.name),
        description: r.description
          ? stripMarkdown(r.description)
          : "No description provided yet.",
        htmlUrl: r.html_url,
        homepage: r.homepage || null,
        stars: r.stargazers_count,
        forks: r.forks_count,
        language: r.language,
        topics: r.topics ?? [],
        updatedAt: r.pushed_at,
      }));
  } catch (err) {
    console.error("Failed to fetch GitHub repos:", err);
    return [];
  }
}

// A few accent colors for common languages — purely decorative, falls
// back to the default emerald dot for anything not listed.
export const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Go: "#00ADD8",
  Dockerfile: "#384d54",
  "Jupyter Notebook": "#DA5B0B",
};
