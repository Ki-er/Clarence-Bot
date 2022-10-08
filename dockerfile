FROM node:18.10.0
RUN mkdir -p /usr/clarence/src
WORKDIR /usr/clarence/src
COPY . /usr/clarence/src
COPY package.json /usr/clarence/src
RUN npm install --force
CMD ["node", "src/index.js"]