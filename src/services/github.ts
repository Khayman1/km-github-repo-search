export const getUserRepos = async (username: string) => {
  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  if (!res.ok) {
    throw new Error("GitHub 사용자 정보를 불러올 수 없습니다.");
  }
  return res.json();
};
