FROM node:19

RUN mkdir -p /clarence
WORKDIR /clarence

# Install app production dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Bundle app source
COPY . ./src

# Optional API/Backend port
EXPOSE 3000

# Run the start command
CMD [ "yarn", "run", "start" ]