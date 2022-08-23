<div align="center">

<img src="https://user-images.githubusercontent.com/32241933/176943810-d3016868-d91b-49cc-9461-ae01b7ffa44d.png" width="150" height="150">


## HullCSS Discord Bot

This bot is a multipurpose discord bot for The Hull Computer Science Society Discord server. 

<img src="https://img.shields.io/github/workflow/status/hullcss/hullcss-discord-bot/Publish%20Docker%20image?style=for-the-badge">
<img src="https://img.shields.io/badge/Discord.JS-13.10.2-blue?style=for-the-badge&logo=DISCORD" />
<img src="https://img.shields.io/badge/Node%20Version-16.16.0-brightgreen?style=for-the-badge&logo=Node.js">
<img src="https://img.shields.io/badge/License-MIT-brightgreen?style=for-the-badge">
</div align="center">

---

This bot features multiple command types from:
* Admin
* Embeds
* Fun
* General
* Slash Commands

Alongside commands, this bot also features:
* Auto threading in `#coursework-help` channel to keep it clean
* Auto embedding of events for information and archiving
* Select menu role system within `#roles`
* Rule agreement button embed with `#code-of-conduct`

---
## Installation 
**This is a private bot used for a specific purpose within a specific discord server however if you do want to run the bot for testing purposes or deploy it to a new location. Follow the instructions below.** 

### 🐋 Docker 
Due to the [Publish.yml](.github/workflows/publish.yml) workflow, the newest build will automatically be pushed to dockerhub.

```docker
docker run -d \
--name=hullcss \
-p 6001:6001 \
-e DISCORD_TOKEN='INSERT DISCORD TOKEN' \
-e PREFIX='!' \
--restart unless-stopped \
kieranr27/hullcss:main
```

Using a tool like [Ouroboros](https://github.com/pyouroboros/ouroboros), you can automatically update containers without the need for restarts.

### 👷 Manual
- Clone the repo 
- Remove the `.template` from `.env.template`
- Replace `INSERT DISCORD TOKEN` with your Discord token.
- Run `npm i` toinstall packages
- Run `node .` to run the bot

---
## Contributions
While this bot is maintained by [Kieran](https://github.com/KieranRobson), contributors are welcome! 
- Contribution guidelines are coming soon.