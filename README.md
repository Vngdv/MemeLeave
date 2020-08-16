# MemeLeave

This is a Discord bot used to play a sound after someone leaves an channel.

## How to run

This bot is intended to be used as a Docker container.

Steps: 

* Put your sounds in the `sounds` folder one of them will be picked at random when someone leaves.
* Change the Bot Token in the `.env` file.
* Build and run the container with `docker-compose up -d` for a detached startup.
