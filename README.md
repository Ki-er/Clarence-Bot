# Clarence Bot
> Clarence is a multipurpose discord bot for The Innercube Discord Server. 

This bot features multiple command types from:
* Admin
* Fun
* General
* Info
* Rainbow Six Siege

# Installation
## 🐋 Docker 
Due to the [Publish.yml](.github/workflows/publish.yml) workflow, the newest build will automatically be pushed to dockerhub.

```docker
docker run -d \
--name=clarence \
-p 6000:6000 \
-e DISCORD_TOKEN='INSERT DISCORD TOKEN' \
-e PREFIX='-' \
--restart unless-stopped \
kieranr27/clarence:latest
```

Using a tool like [Ouroboros](https://github.com/pyouroboros/ouroboros), you can automatically update containers without the need for restarts.

## 👷 Manual
- Clone the repo 
- Create a `.env` file with the following lines:
```
DISCORD_TOKEN = <Discord Token>
PREFIX = !
```
- Run `npm i`
- Run `node .`

---
## Contributions
While this bot is maintained by [Kieran](https://github.com/KieranRobson), contributors are welcome! 

## Invite
Invite Clarence to your discord server: https://discord.com/api/oauth2/authorize?client_id=875491402497294447&permissions=8&scope=bot
