import { notFound } from 'next/navigation';

type Props = {
  params: {
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
    notFound();
  }

  const repo = await res.json();

  return (
    <main className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">{repo.full_name}</h1>
      <p className="text-gray-700 mb-4">{repo.description}</p>

      <ul className="text-sm text-gray-600 space-y-2">
        <li>⭐ Star: {repo.stargazers_count}</li>
        <li>🍴 Fork: {repo.forks_count}</li>
        <li>📦 Language: {repo.language}</li>
        <li>🐛 Open Issues: {repo.open_issues_count}</li>
        <li>
          🔗{' '}
          <a href={repo.html_url} target="_blank" className="text-blue-500 underline">
            GitHub에서 보기
          </a>
        </li>
      </ul>
    </main>
  );
}
