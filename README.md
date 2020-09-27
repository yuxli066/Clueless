# Clue-Less

A lite version of clue for EP Course EN.605.601.83.FA20 - Foundations of Software Engineering

# Developer Setup

Prerequisites include [node](https://nodejs.org/) and [yarn](https://classic.yarnpkg.com/).
One reccomenation (but not requirement) for installing node is to use [nvm](https://github.com/nvm-sh/nvm)

# Structure

## Top Level

The top level directory contains common (dev) dependencies across the other subprojects, and sets up the repo as a
[yarn workspace project](https://classic.yarnpkg.com/en/docs/workspaces/).

## Client

The Client subdirectory contains a [create react app](https://create-react-app.dev/) project. The client uses ES6.

## Server

# Special Notes

All dependencies in client should be dependencies, **not** dev dependencies. This is because the artifact of the
client is a bundle as described [here](https://github.com/facebook/create-react-app/issues/6180). The server uses
ES5.
