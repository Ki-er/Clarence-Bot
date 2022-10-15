const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');
const guild = require('../../schemas/guild-schema');

module.exports = {
	...new SlashCommandBuilder()
		.setName('config')
		.setDescription('Configure a server')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.addChannelOption((option) =>
			option
				.setName('welcomechannel')
				.setDescription('Welcome channel')
				.setRequired(true)
		)
		.addChannelOption((option) =>
			option
				.setName('suggestionchannel')
				.setDescription('Suggestion channel')
				.setRequired(true)
		)
		.addChannelOption((option) =>
			option
				.setName('membercountchannel')
				.setDescription('memberCount channel')
				.setRequired(true)
		),

	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */

	run: async (client, interaction) => {
		const welcomeChannel = interaction.options.getChannel('welcomechannel');
		const suggestionChannel =
			interaction.options.getChannel('suggestionchannel');
		const membercountChannel =
			interaction.options.getChannel('membercountchannel');

		await guild.create({
			_id: interaction.guildId,
			welcomeChannelId: welcomeChannel.id,
			suggestionChannelId: suggestionChannel.id,
			membercountChannelId: membercountChannel.id,
		});
		interaction.reply({ content: `Configuration added`, ephemeral: true });
	},
};
