FROM node:16.17.1

WORKDIR /usr/clarence/

COPY --chown=node:node . .

RUN npm --verbose install

CMD ["node", "src/index.js"]
