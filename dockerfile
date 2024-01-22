FROM node:21.5.0

WORKDIR /usr/clarence/

COPY --chown=node:node . .

 RUN yarn install --ignore-engines
 
RUN apt-get update -y && apt-get install --no-install-recommends -y curl

CMD ["node", "src/index.js"]
