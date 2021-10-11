const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'limb',
    aliases: [''],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        message.channel.send({ files: ['./images/limb.jpg'] });
    }
}
