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

	run: async (client, interaction, args) => {
		const user = interaction.options.getUser('user');
		const memberTargetID = user.id;
		console.log(memberTargetID);

		const { status } = memberTargetID.presence;
		const game = memberTargetID.presence.activities[0]
			? memberTargetID.presence.activities[0].name
			: `User isn't playing a game`;

		let statusEmbed;

		if (status == 'dnd') statusEmbed = '<:dnd:881522766472441886>'; // if the person is dnd  so it will type in the embed Do no Distrub
		if (status == 'online') statusEmbed = '<:online:881595015875416095>';
		if (status == 'offline') statusEmbed = '<:offline:881596009069817907>';
		if (status === 'idle') statusEmbed = '<:idle:881595951419105331>';

		const embed = new MessageEmbed()
			.setTitle(`${statusEmbed} ${memberTargetID.user.tag}`)
			.setURL(`${memberTargetID.user.avatarURL({ dynamic: true })}`)
			.setColor('ORANGE')
			.setFooter({ text: `Called By: ${interaction.user.tag}` })
			.setThumbnail(memberTargetID.user.displayAvatarURL())
			.setTimestamp()
			.addField('Username', `${memberTargetID.user.username}`)
			.addField(
				'Nickname',
				memberTargetID.nickname
					? memberTargetID.nickname
					: 'User has no nickname'
			)
			.addField('ID', `${memberTargetID.user.id}`)
			.addField('Game', game)
			.addField(
				'Joined at: ',
				`${
					memberTargetID.user.joinedAt
						? time(memberTargetID.joinedAt, 'R')
						: 'Unknown'
				}}`
			)
			.addField(
				'Created at: ',
				`${
					memberTargetID.user.createdAt
						? time(memberTargetID.createdAt, 'R')
						: 'Unknown'
				}`
			)
			.addField(
				'Avatar URL',
				`[Link](${memberTargetID.user.avatarURL({ dynamic: true })})`,
				true
			);

		interaction.reply({ embeds: [embed] });
	},
};
