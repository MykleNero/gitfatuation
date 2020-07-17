FROM node:13.7.0-alpine

# Define build args
ARG client_id
ARG node_env

# Set env variables
ENV REACT_APP_GH_CLIENT_ID $client_id
ENV NODE_ENV $node_env

# Set working directory
WORKDIR /app

# Only copy package.json and yarn.lock to download dependencies
COPY ./frontend/package.json ./frontend/yarn.lock ./frontend/

# Set working directory
WORKDIR /app/frontend

# Install npm dependencies
RUN yarn

# Copy remainder of app files
COPY ./frontend ./

# Build app if in production env
RUN if [ "$node_env" = "production" ] ; then npm run build ; fi
