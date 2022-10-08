FROM node:18.10.0
RUN mkdir -p /usr/clarence/src
WORKDIR /usr/clarence/src
COPY package.json /usr/clarence/src
COPY . /usr/clarence/src
RUN npm --verbose install
CMD ["node", "src/index.js"]