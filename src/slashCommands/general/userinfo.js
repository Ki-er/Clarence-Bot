const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder, time } = require('@discordjs/builders');
const cookie = require('../../schemas/cookie-schema');
const userObj = require('../../schemas/user-schema');

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

		let joinedTime;
		joinedTime = await userObj.findById(user.id);
		if(joinedTime != null){
			joinedTime = joinedTime.date
		}
		


		cookie.find().exec(function (err, results) {
			let globalGotCookies = results.filter((cookie) => {
				return cookie.receiverId === user.id;
			});

			let globalSentCookies = results.filter((cookie) => {
				return cookie.giverId === user.id;
			});

			let localGotCookies = globalGotCookies.filter((cookie) => {
				return cookie.guildId === interaction.guild.id;
			});

			let localSentCookies = globalSentCookies.filter((cookie) => {
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
