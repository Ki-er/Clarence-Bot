const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const guildSchema = require('../../schemas/guild-schema');

module.exports = {
	...new SlashCommandBuilder()
		.setName('delconfig')
		.setDescription('Delete a server configuration')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */

	run: async (client, interaction, args) => {
		await guildSchema.findByIdAndRemove(interaction.guild.id);
		interaction.reply({
			content: `Config Removed! Add a new configuration by running /config.`,
			ephemeral: true,
		});
	},
};
