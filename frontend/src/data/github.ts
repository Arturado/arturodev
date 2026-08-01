
export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  topics: string[];
  updated_at: string;
  created_at: string;
}

export interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  topLanguages: { name: string; count: number }[];
  totalForks: number;
}

const GITHUB_USERNAME = 'Arturado';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const fetchOptions: RequestInit = {
  next: { revalidate: 3600 }, // Cache por 1 hora
  headers: GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {},
};

export async function getGithubRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      fetchOptions
    );

    if (!response.ok) {
      console.error('Failed to fetch GitHub repos:', response.statusText);
      return [];
    }

    const repos: GitHubRepo[] = await response.json();
    
    // Filtrar repositorios (puedes ajustar los criterios aquí)
    // Por ejemplo, solo repositorios que no sean forks y tengan descripción
    return repos
      .filter(repo => !repo.name.startsWith('.') && repo.description)
      .sort((a, b) => b.stargazers_count - a.stargazers_count);
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

export async function getGithubStats(): Promise<GitHubStats> {
  const repos = await getGithubRepos();

  const stats: GitHubStats = {
    totalRepos: repos.length,
    totalStars: repos.reduce((acc, repo) => acc + repo.stargazers_count, 0),
    totalForks: repos.reduce((acc, repo) => acc + repo.forks_count, 0),
    topLanguages: [],
  };

  const languages: Record<string, number> = {};
  repos.forEach(repo => {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
  });

  stats.topLanguages = Object.entries(languages)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return stats;
}
