FROM node:16.16.0

RUN mkdir -p /usr/clarence
WORKDIR /usr/clarence

COPY package.json /usr/clarence
RUN npm install

COPY . /usr/clarence

CMD ["node", "src/index.js"]