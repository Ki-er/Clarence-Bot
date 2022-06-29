const { MessageEmbed  } = require("discord.js");
const client = require("../../index");
const profile = require('../../schemas/profile-schema');
require("dotenv").config();

module.exports = {
    name: "xpleaderboard",
    aliases: ['xpl'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {
        const leaderboard = await profile.find({guildId: message.guildId}).sort({level : -1}).limit(10);;
            const embed = new MessageEmbed()
                .setColor('ORANGE')
                .setFooter({
                    text: `Called By: ${message.author.tag}`
                    })
                .setTimestamp()
                .setTitle(`The Top ${leaderboard.length} levels`)

                for(let i = 0; i < leaderboard.length; ++i) {
                    embed.addField(`${i+1}`, `<@${leaderboard[i].userId}> - Level: ${leaderboard[i].level}`)
                }
            message.channel.send({ embeds: [embed] });
        }
    };