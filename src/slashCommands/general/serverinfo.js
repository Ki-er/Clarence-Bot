const { MessageEmbed } = require('discord.js');
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

	run: async (client, interaction) => {
		const owner = await interaction.guild.fetchOwner();
		const { guild } = interaction;
		const thumbnail = guild.iconURL();

		let rolemap = guild.roles.cache
			.sort((a, b) => b.position - a.position)
			.map((r) => r)
			.join(',');
		if (rolemap.length > 1024) rolemap = 'Too many roles to display';
		if (!rolemap) rolemap = 'No roles';

		const embed = new MessageEmbed()
			.setTitle(`${guild.name} (${guild.id})`)
			.setColor('ORANGE')
			.addField(`Owner`, `${owner.user.tag} (${owner.user.id})`)
			.addField(
				'Created',
				`${guild.createdAt ? time(guild.createdAt, 'R') : 'Unknown'}`
			)
			.addField('Member Count', `${guild.memberCount}`)
			.addField(
				'Boost Stats',
				`Boosts: ${guild.premiumSubscriptionCount.toString()}
                Boost Level: ${guild.premiumTier}`
			)
			.addField(
				`Channels`,
				`Text channels: ${
					interaction.guild.channels.cache.filter((r) => r.type == 'GUILD_TEXT')
						.size
				}
                Voice channels: ${
									interaction.guild.channels.cache.filter(
										(r) => r.type == 'GUILD_VOICE'
									).size
								}
                Categories: ${
									interaction.guild.channels.cache.filter(
										(r) => r.type === 'GUILD_CATEGORY'
									).size
								}`
			)
			.addField('Roles', rolemap)
			.setTimestamp()
			.setThumbnail(thumbnail)
			.setFooter({ text: `Called By: ${interaction.user.tag}` });
		interaction.reply({ embeds: [embed] });
	},
};
