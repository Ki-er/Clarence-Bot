const { SlashCommandBuilder } = require('@discordjs/builders');
const npm = require('npm-stats-api');

module.exports = {
	...new SlashCommandBuilder()
		.setName('npm')
		.setDescription('Output a npm packages stats')
		.addStringOption((option) =>
			option
				.setName('package')
				.setDescription('package for the stats you want')
				.setRequired(true)
		),

	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (client, interaction) => {
		const inputPackage = interaction.options.getString('package');

		const date_today = new Date();

		const firstDay = new Date(
			date_today.getFullYear(),
			date_today.getMonth() - 1
		);
		const lastDay = new Date(
			date_today.getFullYear(),
			date_today.getMonth() - 1
		);

		const firstMonth = firstDay.toISOString().split('T')[0];
		const lastMonth = lastDay.toISOString().split('T')[0];

		const res = await npm.stat(
			`${inputPackage}`,
			`${firstMonth}`,
			`${lastMonth}`
		);

		interaction.reply({
			content: ':x: Not a valid emoji',
			ephemeral: true,
		});
		console.log(res);
	},
};
