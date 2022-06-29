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
        const leaderboard = await profile.find({guildId: message.guildId, userId: message.author.id});
            const embed = new MessageEmbed()
                .setColor('ORANGE')
                .setFooter(`Called By: ${message.author.tag}`)
                .setTimestamp()
                .setTitle(``)



            message.channel.send({ embeds: [embed] });
        }
    };
