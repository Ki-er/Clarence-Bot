const guild = require('../../schemas/guild-schema');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits, ChannelType } = require('discord-api-types/v10');

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
				.addChannelTypes(ChannelType.GuildVoice)
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

		membercountChannel.permissionOverwrites.edit(
			interaction.guild.roles.everyone.id,
			{
				CONNECT: false,
			}
		);


		interaction.reply({ content: `Configuration added`, ephemeral: true });
	},
};
