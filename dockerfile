FROM node:19
RUN mkdir -p /usr/clarence/src
WORKDIR /usr/clarence/src
COPY package.json /usr/clarence/src
RUN yarn install
COPY . /usr/clarence/src
CMD ["node", "src/index.js"]
