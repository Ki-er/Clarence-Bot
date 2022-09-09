const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
	...new SlashCommandBuilder()
		.setName('setnick')
		.setDescription('Change a users nickname')
		.setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname)
		.addUserOption((option) =>
			option
				.setName('user')
				.setDescription('user for the avatar you want')
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName('nickname')
				.setDescription('nickname of user')
				.setRequired(false)
		),

	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (client, interaction) => {
		const member = interaction.options.getMember('user');
		const nickname = interaction.options.getString('nickname');
		if (!nickname) {
			await member.setNickname('', `By: ${interaction.user.tag}`);
			return interaction.reply({
				content: `✅ **${member.user.username} nick has been reset!**`,
				ephemeral: true,
			});
		}
		try {
			await member.setNickname(nickname, `By: ${interaction.user.tag}`);
			interaction.reply({
				content: `✅ **${member.user.username} nick has been changed to ${nickname}**`,
				ephemeral: true,
			});
		} catch (e) {
			console.error(e);
			return interaction.reply({ content: `Error: ${e}` });
		}
	},
};
