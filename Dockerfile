FROM node:16 as base

WORKDIR /usr/src/app

COPY --chown=node:node package.json package.json
COPY --chown=node:node package-lock.json package-lock.json


FROM base as dev
COPY --chown=node:node . .
RUN npm ci
USER node
ENV NODE_ENV=dev
CMD ["npm", "run", "dev"]
