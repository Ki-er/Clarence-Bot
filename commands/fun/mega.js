const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "mega",
    aliases: [''],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        message.reply("https://c.tenor.com/7_6SE-1lyT0AAAAd/johnny-depp.gif")
        
    }
}