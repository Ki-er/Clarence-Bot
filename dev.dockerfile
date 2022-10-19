FROM node:19.0.0

WORKDIR /usr/clarence/

COPY --chown=node:node . .

RUN npm install

RUN apt-get update -y && apt-get install --no-install-recommends -y curl

CMD ["npm", "run", "dev"]
