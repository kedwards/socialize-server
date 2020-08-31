FROM node:14 as builder

COPY package*.json ./

RUN npm install

# The instructions for second stage
FROM node:14

ARG GIT_COMMIT=
ARG BUILD_DATE=
ARG SOURCE=https://github.com/kedwards/socialize-server
ARG VERSION=0.0.0
ARG ARG_PORT=5000
ARG NODE_ENV=production

LABEL com.kedwars.socialize-server.revision=$GIT_COMMIT
LABEL com.kedwars.socialize-server.created=$BUILD_DATE
LABEL com.kedwars.socialize-server.source=$SOURCE
LABEL com.kedwars.socialize-server.version=$VERSION
LABEL com.kedwars.socialize-server.vendor="LivITy Consulting"
LABEL com.kedwars.socialize-server.authors="Kevin Edwards <kedwards@kevinedwards.ca"

ENV NODE_ENV=$NODE_ENV
ENV PORT=$ARG_PORT

RUN mkdir -p /home/node/server

WORKDIR /home/node/server/

COPY --from=builder node_modules node_modules

COPY . .

COPY --chown=node:node . .

USER node

EXPOSE $PORT

CMD [ "node", "server.js" ]
