const { Message, MessageEmbed  } = require("discord.js");
const { parse } = require("dotenv");
const client = require("../../index");
require("dotenv").config();
const blames = require('../../schemas/blamestitch-schema');


module.exports = {
    name: "blamescan",
    aliases: ['bs'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const blame = await blames.find({});
        message.channel.send(`Stitch has been blamed ${19 + blame.length} times.\r\nThere were 19 blames before the database.\r\nGetting all database blames, this may take a while.`)

            const embed = new MessageEmbed()
                .setColor('ORANGE')
                .setFooter(`Called By: ${message.author.tag}`)
                .setTimestamp()
                .addField('Reason:', `${blame[i].reason}`)
                .addField('Date', `${blame[i].date.toLocaleDateString("en-UK")}`)
                .addField('Added by', `<@${blame[i].userId}>`);
            message.channel.send({ embeds: [embed] });
        }
    };
