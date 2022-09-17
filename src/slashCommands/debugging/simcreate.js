const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	...new SlashCommandBuilder()
		.setName('simcreate')
		.setDescription('Simulate guild create event'),

	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (client, interaction) => {
		client.emit('guildCreate', interaction.guild);
		interaction.reply({ content: 'Simulated', ephemeral: true });
	},
};
