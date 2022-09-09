const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder, time } = require('@discordjs/builders');

module.exports = {
    ...new SlashCommandBuilder()
        .setName('channelinfo')
        .setDescription('Output info about the info.')
        .addChannelOption((option) => option
        .setName('channel')
        .setDescription("channel for information to be outputted.")
        .setRequired(true)
        ),

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        const channel = interaction.options.getChannel("channel")
        if (channel.type !== `GUILD_TEXT`) return interaction.reply({content: `Could ot parse channel`}, true) 
        console.log(channel)

        let channelembed = new MessageEmbed()
            .setTitle(`Channel Information for ${channel.name}`)
            .setThumbnail(interaction.guild.iconURL())
            .addField("**NSFW**", `${channel.nsfw}`)
            .addField("**Channel ID**", `${channel.id}`)
            .addField("**Channel Type**", `${channel.type}`)
            .addField("**Channel Description**", `${channel.topic || "No Description"}`)
            .addField("**Channel Created At**", `${channel.createdAt ? time(channel.createdAt, "R") : "Unknown"}`)
            .setColor("ORANGE")
            .setFooter({text: `Called By: ${interaction.user.tag}`})            
            .setTimestamp()
        interaction.reply({ embeds: [channelembed] });
    },
}