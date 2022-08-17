const { Client, CommandInteraction, Permissions } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const { st } = require("google-translate-api/languages");


module.exports = {
    ...new SlashCommandBuilder()
        .setName('announce')
        .setDescription('announce')
        .addStringOption((option) => option
            .setName('string')
            .setDescription("string for announcement")
            .setRequired(true)
        )
        .addChannelOption((option) => option
        .setName('channel')
        .setDescription("channel for announcement")
        .setRequired(true)
        ),

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const string = interaction.options.getString("string")
        const channel = interaction.options.getChannel("channel")

        if(!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS | Permissions.FLAGS.ADMINISTRATOR)) return interaction.reply("You don't have permission to use that command.")
        channel.send(string)
        interaction.reply("Announcement sent!")
    },
};