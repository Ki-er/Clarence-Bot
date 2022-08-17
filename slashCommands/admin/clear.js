const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    ...new SlashCommandBuilder()
        .setName('clear')
        .setDescription('clear messages')
        .addIntegerOption((option) => option
            .setName('integer')
            .setDescription("number of messages to clear")
            .setRequired(true)
        ),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

    },
};