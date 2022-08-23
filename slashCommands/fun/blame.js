const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const blame = require('../../schemas/blamestitch-schema');

module.exports = {
    ...new SlashCommandBuilder()
        .setName('blame')
        .setDescription('Blame Stitch')
        .addStringOption((option) => option
            .setName('reason')
            .setDescription("Your reason")
            .setRequired(true)
        ),

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        const reasonToSend = interaction.options.getString("reason")

        const addBlame = await blame.create({
            reason: reasonToSend,
            userId: interaction.user.id,
            date: new Date()
        })
        interaction.reply({content: `Blame Added: ${reasonToSend}`})
    },
};