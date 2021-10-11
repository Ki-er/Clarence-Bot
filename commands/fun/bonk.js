const { Message, Client } = require("discord.js");

module.exports = {
    name: "bonk",
    aliases: [''],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.reply("https://tenor.com/bkKml.gif")
    },
};
