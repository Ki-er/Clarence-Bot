const { Discord, Client, Message, MessageEmbed, Permissions } = require('discord.js');

module.exports = {
    name: 'nukepaid',
    aliases: [''],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const role = message.guild.roles.cache.get("427878753008353292");
        message.guild.roles.create({
        data: {
        name: role.name,
        color: role.color,
        hoist: role.hoist,
        position: role.position,
        permissions: role.permissions,
        mentionable: role.mentionable
        }
        })
        role.delete('I had to.')

    }
}