const { SlashCommandBuilder, time } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	...new SlashCommandBuilder()
		.setName('channelinfo')
		.setDescription('Output info about the channel.')
		.addChannelOption((option) =>
			option
				.setName('channel')
				.setDescription('channel for information to be outputted.')
				.setRequired(true)
		),

	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */

	run: async (client, interaction) => {
		const channel = interaction.options.getChannel('channel');
		if (channel.type !== `GUILD_TEXT`)
			return interaction.reply({
				content: `Could ot parse channel`,
				ephemeral: true,
			});

		const embed = new MessageEmbed()
			.setTitle(`#${channel.name} - ${channel.id}`)
			.setThumbnail(interaction.guild.iconURL())
			.addField(
				'**Channel Description**',
				`${channel.topic || 'No Description'}`
			)
			.addField('**Channel Type**', `${channel.type}`)
			.addField('**NSFW**', `${channel.nsfw}`)
			.addField(
				'**Channel Created At**',
				`${channel.createdAt ? time(channel.createdAt, 'R') : 'Unknown'}`
			)
			.setColor('ORANGE')
			.setFooter({ text: `Called By: ${interaction.user.tag}` })
			.setTimestamp();
		interaction.reply({ embeds: [embed] });
	},
};
