# =========================== Production Build =========================== #
FROM node:lts-alpine
ENV YARN_ENABLE_SCRIPTS=true

RUN mkdir -p /app
WORKDIR /app
RUN mkdir -p .yarn

# add all yarn2 related dependencies
COPY .yarn/ .yarn/
COPY .yarnrc.yml .
COPY .pnp.js .
COPY yarn.lock .
COPY package.json .

# copy src files && move react artifacts to express server
COPY ./ ./
RUN yarn build
RUN mv client/build/* server/public

EXPOSE 3001
CMD ["yarn","workspace","server","start"]
# =========================== Production Build =========================== #
