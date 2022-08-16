const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const blame = require('../../schemas/blamestitch-schema');
const wait = require('node:timers/promises').setTimeout;


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
        await interaction.deferReply()
        await wait(1000)
        interaction.editReply("Blame Added")


    },
};