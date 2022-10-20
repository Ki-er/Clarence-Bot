/* eslint-disable no-restricted-globals */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	...new SlashCommandBuilder()
		.setName('banner')
		.setDescription('Output a users banner')
		.addUserOption((option) =>
			option
				.setName('user')
				.setDescription('user for the avatar you want')
				.setRequired(false)
		),

	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (client, interaction) => {
		const user = interaction.options.getUser('user') || interaction.user;
		if (isNaN(user)) {
			return interaction.reply({
				content: ':x: user id must be a number',
				ephemeral: true,
			});
		}
		try {
			await client.users.fetch(user);
		} catch (e) {
			return interaction.reply({
				content: ":x: i can't find this user",
				ephemera: true,
			});
		}
		const fetchUser = await client.users.fetch(user);
		await fetchUser.fetch(); // to get user banner you need to fetch user before getting banner
		if (!fetchUser.bannerURL())
			return interaction.reply({
				content: ':x: No Banner',
				ephemera: true,
			});
		const embed = new MessageEmbed()
			.setAuthor(fetchUser.tag, fetchUser.displayAvatarURL({ dynamic: true }))
			.setImage(
				fetchUser.bannerURL({ dynamic: true, size: 4096, format: 'png' })
			)
			.setFooter(`Called by ${interaction.user.tag}`)
			.setColor('ORANGE');

		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setStyle('LINK')
				.setURL(
					fetchUser.bannerURL({ dynamic: true, size: 4096, format: 'png' })
				)
				.setLabel('Link to Banner')
		);
		interaction.reply({ embeds: [embed], components: [row] });
	},
};
