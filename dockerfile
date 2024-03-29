FROM node:20.4.0
RUN mkdir -p /usr/clarence/src
WORKDIR /usr/clarence/src
COPY package.json /usr/clarence/src
RUN yarn install --verbose --network-timeout=300000
COPY . /usr/clarence/src
CMD ["node", "src/index.js"]