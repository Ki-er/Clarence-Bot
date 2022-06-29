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

        for(let i = 0; i < blames.length; i++) {
            const reason = blame[i].reason;
            const date = blame[i].date;
            const id = blame[i].userId;

            const embed = new MessageEmbed()
                .setColor('ORANGE')
                .setFooter(`Called By: ${message.author.tag}`)
                .setTimestamp()
                .addField('Reason:', `${reason}`)
                .addField('Date', `${date}`)
                .addField('Added by', `<@${id}>`);
            message.channel.send({ embeds: [embed] });
        }
    },
};