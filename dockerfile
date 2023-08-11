FROM node:20.5.1

WORKDIR /usr/clarence/

COPY --chown=node:node . .

RUN yarn --verbose install

RUN apt-get update -y && apt-get install --no-install-recommends -y curl

CMD ["node", "src/index.js"]
