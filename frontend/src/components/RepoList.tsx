import React from "react";
import { RepoServerRepo, deleteRepo } from "../services/reposerver";
import { List, AutoSizer } from "react-virtualized";
import styled from "styled-components/macro";
import RepoListItem from "./RepoListItem";

type RepoListProps = {
  className?: string;
  repos: RepoServerRepo[] | null;
  onRowClick?: (data: { index: number }) => void;
  onRowDelete?: (data: { index: number }) => void;
  sortFn?: (prevRepo: RepoServerRepo, nextRepo: RepoServerRepo) => number;
};

const RepoList = ({
  className,
  onRowClick,
  onRowDelete,
  repos,
  sortFn,
}: RepoListProps) => {
  const rowHeight = 96;
  const height = 600;

  const sortedRepos = repos ? repos.sort(sortFn) : [];

  return (
    <AutoSizer disableHeight>
      {({ width }) => {
        return (
          <List
            className={className}
            itemCount={sortedRepos.length}
            width={width}
            height={height}
            rowHeight={rowHeight}
            rowCount={sortedRepos.length}
            noRowsRenderer={() => {
              return (
                <div>Search above to add some repos to your favorites !</div>
              );
            }}
            rowRenderer={({ index }) => {
              return (
                <RepoListItem
                  key={sortedRepos[index].id}
                  repo={sortedRepos[index]}
                  height={rowHeight}
                  onDeleteClick={() => {
                    deleteRepo(parseInt(sortedRepos[index].id))
                      .then(() => {
                        console.log("successfully deleted repo");
                        if (onRowDelete) onRowDelete({ index });
                      })
                      .catch((e) => {
                        console.error(e);
                      });
                  }}
                />
              );
            }}
          />
        );
      }}
    </AutoSizer>
  );
};

export default RepoList;
