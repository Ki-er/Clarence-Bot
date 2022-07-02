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
        ),

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const string = interaction.options.getString("string")
        if(interaction.guild && interaction.guild.id !== '744586833135927366') return interaction.reply("That is not available within this server")
        if(!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS, Permissions.FLAGS.ADMINISTRATOR)) return interaction.reply("You don't have permission to use that command.")
        const announceChannel = client.channels.cache.get('845386604067029054')
        announceChannel.send(string)
    },
};