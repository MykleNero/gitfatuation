import React, { useState, useContext } from "react";
import { noop } from "../lib/util";

type GithubAuthContextValue = {
  token: string | null;
  setToken: (token: string) => void;
};

const GithubAuthContext = React.createContext<GithubAuthContextValue>({
  token: null,
  setToken: noop,
});

export const GithubAuthProvider = ({ children }: { children: JSX.Element }) => {
  const [token, setToken] = useState<string | null>(null);

  return (
    <GithubAuthContext.Provider value={{ token, setToken }}>
      {children}
    </GithubAuthContext.Provider>
  );
};

export const useGithubAuthContext = (): GithubAuthContextValue => {
  return useContext(GithubAuthContext);
};
