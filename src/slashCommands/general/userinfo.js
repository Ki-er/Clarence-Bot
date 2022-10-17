const cookie = require('../../schemas/cookie-schema');
const { SlashCommandBuilder, time } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

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

		cookie.find().exec(function (err, results) {
			const globalGotCookies = results.filter((cookie) => {
				return cookie.receiverId === interaction.user.id;
			});

			const globalSentCookies = results.filter((cookie) => {
				return cookie.giverId === interaction.user.id;
			});

			const localGotCookies = globalGotCookies.filter((cookie) => {
				return cookie.guildId === interaction.guild.id;
			});

			const localSentCookies = globalSentCookies.filter((cookie) => {
				return cookie.guildId === interaction.guild.id;
			});

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
				)
				.addFields(
					{
						name: 'Sent cookies',
						value: `This server: ${localSentCookies.length}\nGlobally: ${globalSentCookies.length}`,
						inline: true,
					},
					{
						name: 'Received cookies',
						value: `This server: ${localGotCookies.length}\nGlobally: ${globalGotCookies.length}`,
						inline: true,
					}
				);
			interaction.reply({ embeds: [embed] });
		});
	},
};
