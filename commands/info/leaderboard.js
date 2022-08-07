const { Message, MessageEmbed  } = require("discord.js");
require("dotenv").config();
const profiles = require('../../schemas/profile-schema');


module.exports = {
    name: "leaderboard",
    aliases: ['xpl'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const leaderboard = await profiles.find({guildId: message.guildId}).sort({level: -1}).limit(10)
        const embed = new MessageEmbed()
        .setColor('ORANGE')
        .setFooter({ text: `Called By: ${message.author.tag}`})                   
        .setTimestamp()
        .setTitle(`The Top ${((await leaderboard).length)} levels of ${message.guild.name}`)

        for(let i = 0; i < (await leaderboard).length; ++i)
        {
            embed.addField(`${i+1}`, `<@${leaderboard[i].userId}> - Level: ${leaderboard[i].level}`)
        }
        message.channel.send({ embeds: [embed] })
    }
}