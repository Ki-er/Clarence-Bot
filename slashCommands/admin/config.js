const { Client, CommandInteraction, Util } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const guild = require('../../schemas/guild-schema');


module.exports = {
    ...new SlashCommandBuilder()
        .setName('config')
        .setDescription('Configure a server')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption((option) => option
            .setName('welcomechannel')
            .setDescription("Welcome channel")
            .setRequired(true)
        )
        .addChannelOption((option) => option
            .setName('suggestionchannel')
            .setDescription("Suggestion channel")
            .setRequired(false)
    ),

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        const welcomeChannel = interaction.options.getChannel('welcomechannel')
        const suggestionChannel = interaction.options.getChannel('suggestionchannel')


        const addGuild = await guild.create({
            Guild: interaction.guildId,
            WelcomeChannel: welcomeChannel,
            SuggestionChannel: suggestionChannel
        })
        interaction.reply({content: `Configuration added`})



    },
}