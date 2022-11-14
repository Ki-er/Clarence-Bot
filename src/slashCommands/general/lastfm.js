/*
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	...new SlashCommandBuilder()
		.setName('lastfm')
		.setDescription('Output lastfm information')
		.addSubcommand((subcommand) =>
			subcommand
				.setName('user')
				.setDescription('Output information about a user on lastfm')
				.addStringOption((option) =>
					option
						.setName('username')
						.setDescxription('The user from lastfm')
						.setRequired(true)
				)
		),

	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
