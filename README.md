# MemeLeave

This is a Discord bot used to play a random sound after someone leaves a channel.

## Compose file example

`docker-compose.yml`
```json
version: '3'

services:
  memeleave:
    image: vngdv/meme-leave:latest
    volumes:
    - ./sounds:/sounds
    environment:
    - token=YOUR-DISCORD-TOKEN
```