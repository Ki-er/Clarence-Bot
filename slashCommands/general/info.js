/** 
const { Client, CommandInteraction } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    ...new SlashCommandBuilder()
        .setName('')
        .setDescription('output info about a subject')
        .addSubcommand(subcommand => subcommand
            .setName('user')
            .setDescription("Info about a user")
            .addUserOption((option) => option.setName('user').setDescription(`The user`))
            )
        .addSubcommand(subcommand => subcommand
            .setName('channel')
            .setDescription("Info about a user")
            .addChannelOption((option) => option.setName('channel').setDescription(`The channel`)))
        .addSubcommand(subcommand => subcommand
            .setName('server')
            .setDescription('Info about the server')
        ),

    run: async (client, interaction, args) => {


    },
};
*/