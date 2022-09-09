const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	...new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Output a users avatar')
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
	run: async (client, interaction, args) => {
		const inputUser = interaction.options.getMember('user');

		if (inputUser == null) {
			const avatarEmbed = new MessageEmbed()
				.setColor('ORANGE')
				.setAuthor({
					name: `${interaction.user.tag}`,
					iconURL: `${interaction.user.displayAvatarURL({
						dynamic: true,
						size: 512,
					})}`,
				})
				.setImage(interaction.user.displayAvatarURL({ dynamic: true }))
				.setFooter({ text: `Called By: ${interaction.user.tag}` })
				.setTimestamp();
			interaction.reply({ embeds: [avatarEmbed] });
		} else {
			const avatarEmbed = new MessageEmbed()
				.setColor('ORANGE')
				.setAuthor({
					name: `${inputUser.user.tag}`,
					iconURL: `${inputUser.displayAvatarURL({
						dynamic: true,
						size: 512,
					})}`,
				})
				.setImage(inputUser.displayAvatarURL({ dynamic: true }))
				.setFooter({ text: `Called By: ${interaction.user.tag}` })
				.setTimestamp();
			interaction.reply({ embeds: [avatarEmbed] });
		}
	},
};
