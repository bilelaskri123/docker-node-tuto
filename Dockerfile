FROM node:20 as base

FROM base as development
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4000
CMD [ "npm", "run", "start-dev" ]

FROM base as production
WORKDIR /app
COPY package.json .
RUN npm install --omit=dev
COPY . .
EXPOSE 4000
CMD [ "npm", "start" ]