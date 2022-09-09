const { Util } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { parse } = require('twemoji-parser');

module.exports = {
	...new SlashCommandBuilder()
		.setName('jumbo')
		.setDescription('Output a large emoji')
		.addStringOption((option) =>
			option
				.setName('emoji')
				.setDescription('Emoji to be enlarged')
				.setRequired(true)
		),

	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */

	run: async (client, interaction) => {
		const inputEmoji = interaction.options.getString('emoji');
		const custom = Util.parseEmoji(inputEmoji);

		if (custom.id) {
			const emoji = `https://cdn.discordapp.com/emojis/${custom.id}.${
				custom.animated ? 'gif' : 'png'
			}`;
			return interaction.reply(emoji);
		}
		const parsed = parse(inputEmoji, { assetType: 'png' });
		if (!parsed[0]) return interaction.reply('Could not parse emoji');
		return interaction.reply(inputEmoji);
	},
};
