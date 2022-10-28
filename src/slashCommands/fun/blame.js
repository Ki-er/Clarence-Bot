const blame = require('../../schemas/blamestitch-schema');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	...new SlashCommandBuilder()
		.setName('blame')
		.setDescription('Blame Stitch')
		.addStringOption((option) =>
			option.setName('string').setDescription('Your reason').setRequired(true)
		),

	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */

	run: async (client, interaction) => {
		const reason = interaction.options.getString('string');

		await blame.create({
			reason: reason,
			userId: interaction.user.id,
			date: new Date(),
		});
		interaction.reply({ content: `Blame Added: ${reason}` });
	},
};
