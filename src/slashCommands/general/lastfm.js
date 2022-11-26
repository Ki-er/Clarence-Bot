/*
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	...new SlashCommandBuilder()
		.setName('lastfm')
		.setDescription('Output LastFM information')
		.addSubcommand((subcommand) =>
			subcommand
				.setName('user')
				.setDescription('Output information about a user on LastFM')
				.addStringOption((option) =>
					option
						.setName('username')
						.setDescription('The user from LastFM')
						.setRequired(true)
				)
		),

	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
