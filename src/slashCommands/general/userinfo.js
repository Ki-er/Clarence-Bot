const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder, time } = require('@discordjs/builders');

module.exports = {
	...new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('Output info about a user.')
		.addUserOption((option) =>
			option
				.setName('user')
				.setDescription('user for information to be outputted.')
				.setRequired(true)
		),

	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */

	run: async (client, interaction) => {
		const user = interaction.options.getUser('user');

		const joinedTime = Date.now() - user.joinedAt;

		const embed = new MessageEmbed()
			.setTitle(`${user.tag}`)
			.setURL(`${user.avatarURL({ dynamic: true })}`)
			.setColor('ORANGE')
			.setFooter({ text: `Called By: ${interaction.user.tag}` })
			.setThumbnail(user.avatarURL({ dynamic: true }))
			.setTimestamp()
			.setDescription(
				`- Known as: ${user}
			- Joined: ${joinedTime ? time(joinedTime, 'R') : 'Unknown'}
			- Created: ${user.createdAt ? time(user.createdAt, 'R') : 'Unknown'}`
			);
		interaction.reply({ embeds: [embed] });
	},
};
