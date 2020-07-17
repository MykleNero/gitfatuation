import React from "react";
import { RepoServerRepo, deleteRepo } from "../services/reposerver";
import styled from "styled-components/macro";
import { useService } from "../hooks/useService";

const Wrapper = styled.div<{ height: number }>`
  display: grid;
  grid-template-areas:
    "language language . created created"
    "title title title title title"
    ". . . . ."
    ". . stargazers . ."
    ". . stargazers . delete";
  grid-template-rows: min-content;
  grid-template-columns: repeat(5, 1fr);
  border-bottom: 1px solid;
  padding: 0.7rem;
  height: ${({ height }) => height}px;
`;

const TitleLink = styled.a`
  text-decoration: none;
  color: beige;
  font-size: 1.5rem;
`;

const LanguageText = styled.span`
  text-decoration: none;
  color: #000000;
  font-size: 1rem;
  font-weight: 800;
`;

const DateText = styled.span`
  color: #080808;
  text-align: right;
  font-size: 0.7rem;
  font-weight: 800;
`;

const RepoListItem = ({
  repo,
  height,
  onDeleteClick,
}: {
  height: number;
  repo: RepoServerRepo;
  onDeleteClick: () => void;
}) => {
  // const { data } = useService(deleteRepo(repo.id));

  return (
    <Wrapper height={height}>
      <div style={{ gridArea: "title", textAlign: "left" }}>
        <div
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: "white",
          }}
        >
          <TitleLink href={repo.url}>{repo.fullName}</TitleLink>
        </div>
      </div>
      <div style={{ gridArea: "created", textAlign: "right" }}>
        <DateText>{new Date(repo.createdAt).toDateString()}</DateText>
      </div>
      <div style={{ gridArea: "delete", textAlign: "right" }}>
        <span
          onClick={() => {
            onDeleteClick();
          }}
        >
          Delete
        </span>
      </div>
      <div style={{ gridArea: "stargazers" }}>{repo.stargazersCount || 0}</div>
      <div style={{ gridArea: "language", textAlign: "left" }}>
        <LanguageText>{repo.language}</LanguageText>
      </div>
    </Wrapper>
  );
};

export default RepoListItem;
