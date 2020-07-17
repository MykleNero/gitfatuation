import React, { useState, useEffect } from "react";
import TextInput from "./TextInput";
import { fetchRepos, GithubRepo } from "../services/github";
import styled from "styled-components";

const SearchInput = styled(TextInput)`
  font-size: 1rem;
  width: 100%;
  height: 2rem;
`;

const GithubRepoSearchInput = ({
  authToken,
  filterFn,
  onChange,
}: {
  authToken: string;
  filterFn: (repo: GithubRepo) => boolean;
  onChange: (data: { query?: string; repos: GithubRepo[] }) => void;
}) => {
  const [query, setQuery] = useState("");
  const [repositories, setRepositories] = useState<GithubRepo[]>([]);

  // Fetch favorite repos "once"
  useEffect(() => {
    fetchRepos(authToken)
      .then((repos) => {
        setRepositories(repos);
        onChange({ repos });
      })
      .catch((e) => {
        console.error(e);
      });
  }, [authToken, onChange]);

  useEffect(() => {
    const filteredRepos = repositories.filter((repository) => {
      return repository.full_name.includes(query) && filterFn(repository);
    });

    onChange({ query, repos: filteredRepos });
  }, [query, onChange, repositories, filterFn]);

  return (
    <SearchInput
      placeholder="Search your Github repositories!"
      value={query}
      onChange={(val) => {
        setQuery(val);
      }}
    />
  );
};

export default GithubRepoSearchInput;
