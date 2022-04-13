const client = require("../index");
const discord = require('discord.js');
client.on('guildMemberRemove', guildmember => {
    guildmember.guild.channels.cache.get('744594748815310930').send(`<:bye:875359507503546438> Goodbye **${guildmember.member.username}** has just left server!`)
    
});