FROM node:14.8

COPY . .

VOLUME [ "/sounds" ]

ENV GID=1000 \
    PUID=1000

RUN yarn install

ENTRYPOINT [ "yarn", "start-production" ]