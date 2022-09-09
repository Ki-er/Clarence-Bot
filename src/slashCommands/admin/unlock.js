const { Permissions } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
	...new SlashCommandBuilder()
		.setName('unlock')
		.setDescription('Unlock a channel')
		.setDefaultMemberPermissions(
			PermissionFlagsBits.KickMembers || PermissionFlagsBits.BanMembers
		),
	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (interaction) => {
		const permission = interaction.member.permissions.has(
			Permissions.FLAGS.MANAGE_CHANNELS
		);
		if (!permission)
			return interaction.reply({
				contents: "You don't have permission to use this command",
				ephemeral: true,
			});
		interaction.channel.permissionOverwrites.edit(
			interaction.guild.roles.everyone.id,
			{
				SEND_MESSAGES: true,
			}
		);
		interaction.reply('Channel has been unlocked.');
	},
};
