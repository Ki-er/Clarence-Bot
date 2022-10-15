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
				.setRequired(true)
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

		cookie.find().exec(function (err, results) {
			let receiverGotCookies = results.filter((cookie) => {
				return (
					cookie.receiverId === receiver.id &&
					cookie.guildId === interaction.guild.id
				);
			}).length;

			let senderSentCookies = results.filter((cookie) => {
				return (
					cookie.giverId === interaction.user.id &&
					cookie.guildId === interaction.guild.id
				);
			}).length;

			const embed = new MessageEmbed()
				.setColor('ORANGE')
				.setFooter({
					text: `Called By: ${interaction.user.tag}`,
				})
				.setTimestamp()
				.setTitle('Cookie')
				.setDescription(
					`${interaction.user.toString()} has given a cookie to ${receiver.toString()}
					
					<@${receiver.id}> now ${receiverGotCookies} has cookies!
					<@${interaction.user.id}> has sent ${senderSentCookies} cookies`
				)
				.setImage('https://i.imgur.com/ioaWGdf.png');

			interaction.reply({ embeds: [embed] });
		});
	},
};
