const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder, time } = require('@discordjs/builders');

module.exports = {
    ...new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Output info about the server.'),

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        const owner = await interaction.guild.fetchOwner();
        const guild = interaction.guild
        const thumbnail = guild.iconURL()

        let rolemap = guild.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(r => r)
        .join(",");
        if (rolemap.length > 1024) rolemap = "Too many roles to display";
        if (!rolemap) rolemap = "No roles";

        let embed = new MessageEmbed()
        .setAuthor(guild.name, guild.iconURL)
        .setColor('ORANGE')
        .addField(`Owner`, `${owner.user.tag} (${owner.user.id})`)
        .addField('ID', `${guild.id}`)
        .addField('Member Count', `People: ${guild.memberCount - guild.members.cache.filter(m=>m.user.bot).size}\r\n Bots: ${guild.members.cache.filter(m=>m.user.bot).size}`)
        .addField('Boosts',  guild.premiumSubscriptionCount.toString(), true )
        .addField('Boost Level',  guild.premiumTier, true)
        .addField('Created', `${guild.createdAt ? time(guild.createdAt, "R") : "Unknown"}`)
        .addField('Roles', rolemap)
        .setTimestamp()
        .setThumbnail(thumbnail)
        .setFooter({ text: `Called By: ${interaction.user.tag}`})
        interaction.reply({ embeds: [embed] }); 
    },
}