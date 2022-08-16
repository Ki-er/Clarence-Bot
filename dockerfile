FROM node:lts-alpine3.16

# Create the directory!
RUN mkdir -p /usr/src/clarence
WORKDIR /usr/src/clarence

# Copy and Install our bot
COPY package.json /usr/src/clarence
RUN npm install

# Our precious bot
COPY . /usr/src/clarence

# Start me!
CMD ["node", "index.js"]

