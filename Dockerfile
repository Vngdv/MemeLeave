FROM node:14.8

COPY . .

VOLUME [ "/sounds" ]

ENV GID=1000 \
    PUID=1000

RUN yarn install
RUN apt-get update && apt-get install -y ffmpeg

ENTRYPOINT [ "yarn", "start-production" ]