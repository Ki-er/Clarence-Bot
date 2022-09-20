const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const cookie = require('../../schemas/cookie-schema');

module.exports = {
	...new SlashCommandBuilder()
		.setName('cookie')
		.setDescription('Give a cookie')
		.addUserOption((option) =>
			option.setName('user').setDescription('a user').setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName('string')
				.setDescription('reason for cookie')
				.setRequired(false)
		),
	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (client, interaction) => {
		const receiver = interaction.options.getUser('user');
		const reason = interaction.options.getString('string');

		await cookie.create({
			receiverId: receiver.id,
			giverId: interaction.user.id,
			reason: reason,
			guildId: interaction.guildId,
			date: new Date(),
		});

		const embed = new MessageEmbed()
			.setColor('ORANGE')
			.setFooter({ text: `Called By: ${interaction.user.tag}` })
			.setTimestamp()
			.setTitle('Cookie')
			.setDescription(
				`${interaction.user.toString()}, has given a cookie to ${receiver.toString()}`
			)
			.setImage('https://i.imgur.com/ioaWGdf.png');

		interaction.reply({ embeds: [embed] });
	},
};
