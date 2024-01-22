FROM node:21.5.0
RUN mkdir -p ~/clarence/src
WORKDIR ~/clarence/src
COPY package.json ~/clarence/src
RUN yarn install
COPY . ~/clarence/src
CMD ["node", "src/index.js"]