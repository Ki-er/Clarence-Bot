FROM node:16.17.1

WORKDIR /usr/clarence/

COPY --chown=node:node . .

RUN npm install

CMD ["npm", "run", "dev"]
