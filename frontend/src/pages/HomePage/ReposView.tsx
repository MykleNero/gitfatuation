import React, { useState, useCallback } from "react";
import { useGithubAuthContext } from "../../contexts/GithubAuthContext";
import GithubRepoSearchInput from "../../components/GithubRepoSearchInput";
import { GithubRepo } from "../../services/github";
import styled from "styled-components/macro";
import {
  createRepo,
  fetchAllRepos,
  RepoServerRepo,
} from "../../services/reposerver";
import { useService } from "../../hooks/useService";
import GithubRepoSearchResultsList from "../../components/GithubRepoSearchResultsList";
import RepoList from "../../components/RepoList";

const sortOptions = {
  createdAt: {
    ASC: (a: RepoServerRepo, b: RepoServerRepo) => {
      return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
    },
    DESC: (a: RepoServerRepo, b: RepoServerRepo) => {
      return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
    },
  },
  stargazersCount: {
    DESC: (a: RepoServerRepo, b: RepoServerRepo) => {
      const countA = a.stargazersCount || 0;
      const countB = b.stargazersCount || 0;
      return countA < countB ? 1 : -1;
    },
    ASC: (a: RepoServerRepo, b: RepoServerRepo) => {
      const countA = a.stargazersCount || 0;
      const countB = b.stargazersCount || 0;
      return countA > countB ? 1 : -1;
    },
  },
};

const PageWrapper = styled.div`
  width: 100%;
`;

const GithubRepoSearchWrapper = styled.div`
  position: relative;
`;

const UserRepoList = styled(RepoList)`
  background: red;
`;

const ReposView = () => {
  const { token: githubAuthToken } = useGithubAuthContext();
  const [searchResults, setSearchResults] = useState<GithubRepo[]>([]);
  const [isShowingResults, setIsShowingResults] = useState(false);
  const [sortField, setSortField] = useState<keyof typeof sortOptions>(
    "createdAt"
  );
  const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("DESC");
  const { data: userRepos, refetch, updateOptimistically } = useService(
    fetchAllRepos
  );
  const onSearchResults = useCallback(
    ({ query, repos }: { query?: string; repos: GithubRepo[] }) => {
      const shouldDisplayReults = !!query && !!query.length;
      setIsShowingResults(shouldDisplayReults);
      setSearchResults(repos);
    },
    [setSearchResults]
  );

  const filterFavoritedRepos = useCallback(
    (repo: GithubRepo) => {
      const userRepoIds = userRepos ? userRepos.map((result) => result.id) : [];
      return !userRepoIds.includes(`${repo.id}`);
    },
    [userRepos]
  );

  const updateSort = (fieldName: keyof typeof sortOptions) => {
    if (sortField === fieldName && sortDirection === "ASC") {
      setSortDirection("DESC");
    } else if (sortField === fieldName && sortDirection === "DESC") {
      setSortDirection("ASC");
    } else {
      setSortField(fieldName);
      setSortDirection("DESC");
    }
  };

  const onSearchResultClick = ({ index }: { index: number }): void => {
    const oldRepos = userRepos ? userRepos : [];
    const selectedRepo = searchResults[index];
    const newRepos: RepoServerRepo[] = [
      ...oldRepos,
      {
        createdAt: selectedRepo.created_at,
        fullName: selectedRepo.full_name,
        id: `${selectedRepo.id}`,
        language: selectedRepo.language,
        stargazersCount: selectedRepo.stargazers_count,
        url: selectedRepo.html_url,
      },
    ];

    // Optimistically set the new repos
    updateOptimistically(newRepos);

    // Add Repo to favorites
    createRepo(selectedRepo)
      .then(() => {
        console.log("successfully saved repo to favorites");
        refetch();
      })
      .catch((e) => {
        // Revert to previous repos
        updateOptimistically(oldRepos);
        console.error(e);
      });
  };

  if (!githubAuthToken) {
    throw new Error("no token");
  }

  return (
    <PageWrapper>
      <GithubRepoSearchWrapper>
        <div style={{ padding: "0.7rem", display: "flex" }}>
          <GithubRepoSearchInput
            authToken={githubAuthToken}
            filterFn={filterFavoritedRepos}
            onChange={onSearchResults}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <div>Sort:</div>
          <div
            onClick={() => {
              updateSort("createdAt");
            }}
          >
            createdAt
          </div>
          <div
            onClick={() => {
              updateSort("stargazersCount");
            }}
          >
            stargazersCount
          </div>
        </div>

        <GithubRepoSearchResultsList
          isShowing={isShowingResults}
          repos={searchResults}
          onRowClick={onSearchResultClick}
        />
      </GithubRepoSearchWrapper>

      {userRepos ? (
        <UserRepoList
          repos={userRepos}
          onRowDelete={() => {
            refetch();
          }}
          sortFn={sortOptions[sortField][sortDirection]}
        />
      ) : null}
    </PageWrapper>
  );
};

export default ReposView;
