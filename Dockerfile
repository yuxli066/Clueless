# =========================== Production Build =========================== #
FROM node:lts-alpine

WORKDIR /app

# add all yarn related dependencies
COPY yarn.lock .
COPY package.json .
COPY client/package.json client/
COPY server/package.json server/

# make the node env production just in case yarn decides to do special things when it's set
ENV NODE_ENV production

# in the future, we might be able to just install the server
RUN yarn install --production

# copy src files && move react artifacts to express server
COPY ./client ./client
RUN yarn build
COPY ./server ./server
RUN mv client/build/* server/public

# NOTE this expose only works on local dev! (in heroku it's ignored!)
EXPOSE 3000
CMD ["yarn","workspace","server","start"]
# =========================== Production Build =========================== #
