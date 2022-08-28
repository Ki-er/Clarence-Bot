# Clarence Bot

<img src="https://img.shields.io/github/workflow/status/KieranRobson/Clarence-Bot/ci?style=for-the-badge">
<img src="https://img.shields.io/badge/Discord.JS-13.10.2-blue?style=for-the-badge&logo=DISCORD" />
<img src="https://img.shields.io/badge/Node%20Version-16.16.0-brightgreen?style=for-the-badge&logo=Node.js">
<img src="https://img.shields.io/badge/License-MIT-brightgreen?style=for-the-badge">

</br>
</br>


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
-p 6002:6002 \
-e DISCORD_TOKEN='INSERT DISCORD TOKEN' \
-e MONGOOSE='INSERT MONGODB URL' \
-e PREFIX='-' \
--restart unless-stopped \
kieranr27/clarence:latest
```

Using a tool like [Ouroboros](https://github.com/pyouroboros/ouroboros), you can automatically update containers without the need for restarts.

## 👷 Manual
- Clone the repo 
- Remove the `.template` from `.env.template`
- Add Discord Bot Token where `DISCORD_TOKEN` is within the `.env` file 
- Run `npm i`
- Run `node .`

---
## Contributions
While this bot is maintained by [Kieran](https://github.com/KieranRobson), contributors are welcome! 

## Invite
Invite Clarence to your discord server: https://discord.com/api/oauth2/authorize?client_id=875491402497294447&permissions=8&scope=bot