import { notFound } from 'next/navigation';

type Props = {
  params: {
    lng: string; 
    name: string;
  };
  searchParams: {
    user: string;
  };
};

export default async function RepoDetail({ params, searchParams }: Props) {
  const { name } = params;
  const { user } = searchParams;

  const res = await fetch(`https://api.github.com/repos/${user}/${name}`);

  if (!res.ok) {
    throw new Error('Failed to fetch repo details');
  }

  const repo = await res.json();

  return (
    <main className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-900">{repo.full_name}</h1>
      <p className="text-lg text-gray-600 mb-8 text-center">{repo.description}</p>

      <ul className="space-y-4 text-gray-700 text-sm">
        <li className="flex justify-between">
          <span>⭐ Star:</span>
          <span>{repo.stargazers_count}</span>
        </li>
        <li className="flex justify-between">
          <span>🍴 Fork:</span>
          <span>{repo.forks_count}</span>
        </li>
        <li className="flex justify-between">
          <span>📦 Language:</span>
          <span>{repo.language}</span>
        </li>
        <li className="flex justify-between">
          <span>🐛 Open Issues:</span>
          <span>{repo.open_issues_count}</span>
        </li>
        <li className="flex justify-between">
          <span>🔗 GitHub:</span>
          <a href={repo.html_url} target="_blank" className="text-blue-500 underline">
            View on GitHub
          </a>
        </li>
      </ul>
    </main>
  );
}
