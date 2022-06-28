const { Message, MessageActionRow, MessageButton  } = require("discord.js");
const client = require("../../index");
require("dotenv").config();
const blame = require('../../schemas/blamestitch-schema');


module.exports = {
    name: "blame",
    aliases: [''],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let messageArgs = args.join(' ');
        if (!messageArgs[1]) return message.reply('Please specify a reason.');

        const addBlame = await blame.create({
            reason: messageArgs,
            userId: message.author.id,
            date: new Date()
        })
        message.reply("Blame Added")


    },
};


