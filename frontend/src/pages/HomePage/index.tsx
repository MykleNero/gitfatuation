import React from "react";
import { useGithubAuthContext } from "../../contexts/GithubAuthContext";
import ReposView from "./ReposView";
import styled from "styled-components";

const CLIENT_ID = process.env.REACT_APP_GH_CLIENT_ID;

const LoginButton = styled.div`
  background: #616161;
  width: 18rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  margin: auto;
  text-decoration: none;
  color: white;
`;

const HomePage = (): JSX.Element => {
  const { token: githubAuthToken } = useGithubAuthContext();

  return githubAuthToken ? (
    <ReposView />
  ) : (
    <a
      href={`https://github.com/login/oauth/authorize?scope=user:email:repo&client_id=${CLIENT_ID}`}
    >
      <LoginButton>Login With Github</LoginButton>
    </a>
  );
};

export default HomePage;
