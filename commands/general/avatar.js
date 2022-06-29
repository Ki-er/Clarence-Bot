const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'avatar',
    aliases: [''],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {

            const user = message.mentions.users.first() || message.author;
            const avatarEmbed = new MessageEmbed()
            .setColor('ORANGE')
            .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
            .setImage(user.displayAvatarURL({dynamic: true}))
            .setFooter({
                text: `Called By: ${message.author.tag}`
            })                   
            .setTimestamp()
            message.channel.send({ embeds: [avatarEmbed] });
        
    }
}