export const getUserRepos = async (
  username: string,
  page = 1,
  perPage = 10
) => {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`
  );
  if (!res.ok) {
    throw new Error('레포지토리를 불러올 수 없습니다.');
  }
  return res.json();
};
