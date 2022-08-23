const client = require("../index");
const discord = require('discord.js');
client.on('guildMemberRemove', guildmember => {
    if(guildmember.guild.id == "744586833135927366")
    {
        guildmember.guild.channels.cache.get('744594748815310930').send(`<:bye:875359507503546438> Goodbye **${guildmember.user.tag}** has just left server!`)

    }
});