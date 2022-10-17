FROM node:18.11.0

WORKDIR /usr/clarence/

COPY --chown=node:node . .

RUN npm install

CMD ["npm", "run", "dev"]
