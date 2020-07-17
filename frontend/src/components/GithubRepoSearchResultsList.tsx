import React from "react";
import { List, AutoSizer } from "react-virtualized";
import { GithubRepo } from "../services/github";
import styled from "styled-components/macro";

type GithubRepoSearchResultsListProps = {
  repos: GithubRepo[];
  onRowClick?: (data: { index: number }) => void;
  isShowing?: boolean;
};

const Wrapper = styled.div<{ isShowing?: boolean }>`
  background: red;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 100;
  ${({ isShowing }) => (isShowing ? `display: initial` : "display: none")};
`;

const ListItemWrapper = styled.div<{ height: number }>`
  padding: 0.7rem;
  height: ${({ height }) => `${height}px`};
  border-bottom: 1px solid #333;
`;

const GithubRepoSearchResultsList = ({
  repos,
  onRowClick,
  isShowing,
}: GithubRepoSearchResultsListProps) => {
  const rowHeight = 48;
  const height = 200;

  const sortedRepos = repos.sort((a, b) => {
    return new Date(a.created_at) < new Date(b.created_at) ? 1 : -1;
  });

  return (
    <Wrapper isShowing={isShowing && repos.length > 0}>
      <AutoSizer disableHeight>
        {({ width }) => {
          return (
            <List
              height={height}
              rowHeight={rowHeight}
              rowCount={repos.length}
              width={width}
              itemCount={repos.length}
              noRowsRenderer={() => {
                return <div>No results to show</div>;
              }}
              rowRenderer={({ index }) => {
                return (
                  <ListItemWrapper
                    height={rowHeight}
                    onClick={() => {
                      if (onRowClick) onRowClick({ index });
                    }}
                  >
                    {sortedRepos[index].full_name}
                  </ListItemWrapper>
                );
              }}
              style={{
                position: "absolute",
                background: "#aaa",
                left: 0,
                right: 0,
                width: "auto",
              }}

              // rowRenderer={({ index }) => {
              //   return <div>{repos[index].full_name}</div>;
              // }}
              // onRowClick={({ index }) => {
              //   if (onRowClick) onRowClick({ index });
              // }}
            />
          );
        }}
      </AutoSizer>
    </Wrapper>
  );
};

export default GithubRepoSearchResultsList;
