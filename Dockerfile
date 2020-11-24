FROM node:15.2.1-alpine

WORKDIR /usr/src/app

RUN apk add --update-cache \
        python \
        opus \
        build-base \
        ffmpeg

# Add Yarn and Package files
COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production

# We only need our index.js at the moment
COPY index.js /.

VOLUME [ "/sounds" ]

ENV GID=1000 \
    PUID=1000

CMD [ "meme-leave" ]