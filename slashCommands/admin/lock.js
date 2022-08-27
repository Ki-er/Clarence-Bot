const { Client, CommandInteraction, Permissions } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
    ...new SlashCommandBuilder()
        .setName('lock')
        .setDescription('lock a channel')
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers | PermissionFlagsBits.BanMembers),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

        const permission = interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)
        if (!permission)return interaction.reply({ contents: "You don't have permission to use this command", ephemeral: true });
        interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone.id, {SEND_MESSAGES: false});
        interaction.reply("Channel has been locked.")

    },
};