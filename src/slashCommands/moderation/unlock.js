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
	run: async (client, interaction) => {
		interaction.channel.permissionOverwrites.edit(
			interaction.guild.roles.everyone.id,
			{
				SEND_MESSAGES: true,
			}
		);
		interaction.reply('Channel has been unlocked.');
	},
};
