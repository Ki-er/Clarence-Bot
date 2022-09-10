const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
	...new SlashCommandBuilder()
		.setName('lock')
		.setDescription('Lock a channel')
		.setDefaultMemberPermissions(
			PermissionFlagsBits.KickMembers || PermissionFlagsBits.BanMembers
		),

	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */

	run: async (client, interaction) => {
		interaction.channel.permissionOverwrites.edit(
			interaction.guild.roles.everyone.id,
			{
				SEND_MESSAGES: false,
			}
		);
		interaction.reply({ content: `Channel has been locked.` });
	},
};
