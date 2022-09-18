const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
	...new SlashCommandBuilder()
		.setName('untimeout')
		.setDescription('Remove timeout from a user')
		.setDefaultMemberPermissions(
			PermissionFlagsBits.ModerateMembers || PermissionFlagsBits.KickMembers
		)
		.addUserOption((option) =>
			option
				.setName('user')
				.setDescription('User to remove timeout from.')
				.setRequired(true)
		),

	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (client, interaction) => {
		const member = interaction.options.getMember('user');
		if (!member.isCommunicationDisabled()) {
			return interaction.reply({
				content: ':x: This user is not in timeout.',
				ephemeral: true,
			});
		}
		await member.disableCommunicationUntil(null, `By: ${interaction.user.tag}`);
		interaction.reply({
			content: `Timeout has been removed from ${member}`,
			ephemeral: true,
		});
	},
};
