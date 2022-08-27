const { Client, Message, Permissions } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');


module.exports = {
    ...new SlashCommandBuilder()
        .setName('unlock')
        .setDescription('unlocks a channel')
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers | PermissionFlagsBits.BanMembers),

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