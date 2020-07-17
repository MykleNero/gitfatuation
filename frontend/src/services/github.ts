import axios from "axios";

export type GithubRepo = {
  created_at: string;
  full_name: string;
  id: number;
  language: string;
  stargazers_count: number;
  html_url: string;
};

export const fetchRepos = (token: string): Promise<GithubRepo[]> => {
  const url = "https://api.github.com/user/repos";
  const headers = {
    Authorization: `token ${token}`,
  };

  return axios
    .get<GithubRepo[]>(url, {
      headers,
    })
    .then((response) => response.data);
};
