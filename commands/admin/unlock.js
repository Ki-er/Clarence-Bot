const { Client, Message, Permissions } = require('discord.js');

module.exports = {
    name: 'unlock',
    aliases: [''],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {

        const permission = message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)
        if (!permission)return message.reply({ contents: "You don't have permission to use this command" });
        
        message.channel.permissionOverwrites.edit(message.guild.roles.everyone.id, {SEND_MESSAGES: true});

        message.channel.send("Channel has been unlocked.")
    }
}