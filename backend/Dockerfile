FROM node:13.7.0-alpine

ARG node_env

ENV NODE_ENV=${node_env}

WORKDIR /app

COPY backend/package.json backend/yarn.lock ./backend/

WORKDIR /app/backend

RUN yarn

COPY ./backend .
