import React, { useEffect, useState } from "react";
import { useGithubAuthContext } from "../contexts/GithubAuthContext";
import { Redirect } from "react-router-dom";
import { fetchGithubAccessToken } from "../services/api";

const GithubAuthCallbackPage = ({ code }: { code: string | null }) => {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const { setToken } = useGithubAuthContext();

  useEffect(() => {
    if (code) {
      fetchGithubAccessToken(code)
        .then((response) => {
          if (response) {
            setToken(response.accessToken);
            setShouldRedirect(true);
          }
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [code, setToken]);

  return <div>{shouldRedirect ? <Redirect to="/" /> : null}</div>;
};

export default GithubAuthCallbackPage;
