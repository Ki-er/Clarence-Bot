const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const cookie = require('../../schemas/cookie-schema');

module.exports = {
	...new SlashCommandBuilder()
		.setName('showcookies')
		.setDescription('Output amount of cookies')
		.addUserOption((option) =>
			option
				.setName('user')
				.setDescription('user for the details you want')
				.setRequired(false)
		)
		.addStringOption((option) =>
			option.setName('type').setDescription('special case').setRequired(false)
		),

	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (client, interaction) => {
		const inputUser = interaction.options.getMember('user');
		const type = interaction.option.getString('type');
	},
};
