const { SlashCommandBuilder } = require('@discordjs/builders');
const blame = require('../../schemas/blamestitch-schema');

module.exports = {
	...new SlashCommandBuilder()
		.setName('blame')
		.setDescription('Blame Stitch')
		.addStringOption((option) =>
			option.setName('reason').setDescription('Your reason').setRequired(true)
		),

	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */

	run: async (interaction) => {
		const reasonToSend = interaction.options.getString('reason');

		await blame.create({
			reason: reasonToSend,
			userId: interaction.user.id,
			date: new Date(),
		});
		interaction.reply({ content: `Blame Added: ${reasonToSend}` });
	},
};
