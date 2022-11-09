FROM node:19.0.1

WORKDIR /usr/clarence/

COPY --chown=node:node . .

RUN npm --verbose install

RUN apt-get update -y && apt-get install --no-install-recommends -y curl

CMD ["node", "src/index.js"]
