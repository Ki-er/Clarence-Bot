<div align="center">

<img src="https://cdn.discordapp.com/avatars/875491402497294447/54e4808cf46edbeb5ef702d3af14087a.webp" width="150" height="150">

## Clarence Bot

Clarence is a multipurpose discord bot for The Innercube Discord Server.

<img src="https://img.shields.io/github/workflow/status/KieranRobson/Clarence-Bot/ci?style=for-the-badge"> 
<img src="https://img.shields.io/badge/Discord.JS-13.10.2-blue?style=for-the-badge&logo=DISCORD" /> 
<img src="https://img.shields.io/badge/Node%20Version-16.16.0-brightgreen?style=for-the-badge&logo=Node.js"> 
<img src="https://img.shields.io/badge/License-MIT-brightgreen?style=for-the-badge">
</div align="center">

---

This bot features multiple command types from:

- Admin
- Fun
- General
- Info
- Rainbow Six Siege

---

## Installation

### 🐋 Docker

Due to the [Publish.yml](.github/workflows/publish.yml) workflow, the newest build will automatically be pushed to DockerHub.

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

### 👷 Manual

- Clone the repo
- Remove the `.template` from `.env.template`
- Add required variables to `.env`
- Run `npm i`
- Run `node .`

---

## Contributions

While this bot is maintained by [Kieran](https://github.com/KieranRobson), contributors are welcome!

## Invite

Invite Clarence to your discord server: https://discord.com/api/oauth2/authorize?client_id=875491402497294447&permissions=8&scope=bot

## License

Clarence-Bot is licensed under the MIT License. The full license text is included in the [LICENSE](LICENSE) file in this repository. Tldr legal have a [great summary](https://www.tldrlegal.com/l/mit) of the license if you're interested.
