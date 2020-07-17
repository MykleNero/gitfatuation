import axios from "axios";

export const fetchGithubAccessToken = (
  code: string
): Promise<{ accessToken: string } | void> => {
  const url = "http://localhost:4000/github/access_token";

  const params = {
    code,
  };

  return axios
    .get(url, {
      params,
    })
    .then((response) => {
      return {
        accessToken: response.data.access_token,
      };
    })
    .catch((e) => {
      console.error(e);
    });
};
