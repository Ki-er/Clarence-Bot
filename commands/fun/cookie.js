const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'cookie',
    aliases: [''],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        const embed = new MessageEmbed()
        .setColor('ORANGE')
        .setFooter({text: `Called By: ${message.author.tag}`})        
        .setTimestamp()
        .setTitle("Cookie")
        .setDescription(`${message.author.toString()}, has given a cookie to ${member.toString()}`)
        .setImage("https://i.imgur.com/ioaWGdf.png")

        message.channel.send({ embeds: [embed] })
    }
}