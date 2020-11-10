# Clue-Less

A lite version of clue for EP Course EN.605.601.83.FA20 - Foundations of Software Engineering

# Developer Setup

Prerequisites include [node](https://nodejs.org/) and [yarn](https://classic.yarnpkg.com/).
One reccomenation (but not requirement) for installing node is to use [nvm](https://github.com/nvm-sh/nvm)

# Quick Start

This repo uses `yarn 2` with `zero installs` enabled. This means that developers don't need to run `yarn install` anymore to get the app up and running.
After installing node and yarn, run the following to start the client and server together in dev mode:

```bash
yarn start
```

# Structure

## Top Level

The top level directory contains common (dev) dependencies across the other subprojects, and sets up the repo as a
[yarn workspace project](https://classic.yarnpkg.com/en/docs/workspaces/).

## Client

The Client subdirectory contains a [create react app](https://create-react-app.dev/) project. The client uses ES6.
When built, the client puts its artifacts in the `build` directory.

## Server

The server contains an express app for servering the client as a static bundle. This is done via symlinking the server's `public` directory to the client's `build` directory. It uses ES5.

# Special Notes

- All dependencies in client should be dependencies, **not** dev dependencies. This is because the artifact of the
  client is a bundle as described [here](https://github.com/facebook/create-react-app/issues/6180).

- When in dev mode, the server doesn't actually serve the clinet, because the client uses a special dev server to enable hot reloading. This special server proxies to the actual server to facilitate websocket communication.
