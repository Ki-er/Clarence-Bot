const { getQuote } = require('../../utils/GoodReads');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	...new SlashCommandBuilder()
		.setName('quote')
		.setDescription('Get a Quote')
		.addStringOption((option) =>
			option.setName('string').setDescription('Type of quote').setRequired(true)
		),
	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (client, interaction) => {
		const quote_type = interaction.options.getString('string');

		await interaction.deferReply();

		const quote = await getQuote(quote_type);
		if (quote === null) {
			await interaction.editReply('Quote does not exist.');
		} else {
			await interaction.editReply(
				`> ${quote.text}  \n -${quote.author ?? 'unknown'}`
			);
		}
	},
};
