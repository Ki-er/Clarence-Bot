require('dotenv').config();
const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
	...new SlashCommandBuilder()
		.setName('linkshorten')
		.setDescription('Shorten links!')
		.addStringOption((option) =>
			option
				.setName('inputlink')
				.setDescription(
					'The destination URL you want your branded short link to point to'
				)
				.setRequired(true)
		),

	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */

	run: async (client, interaction) => {
		const RAPID_API = process.env.RAPID_API;

		await interaction.deferReply({
			ephemeral: true,
		});

		const link = interaction.options.getString('inputlink');

		const encodedParams = new URLSearchParams();
		encodedParams.set('url', link);

		const options = {
			method: 'POST',
			url: 'https://url-shortener-service.p.rapidapi.com/shorten',
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
				'X-RapidAPI-Key': RAPID_API,
				'X-RapidAPI-Host': 'url-shortener-service.p.rapidapi.com',
			},
			data: encodedParams,
		};

		try {
			const response = await axios.request(options);
			console.log(response.data);

			interaction.editReply({
				content: `Your shortened url is ${response.data.result_url}`,
				ephemeral: true,
			});
		} catch (error) {
			interaction.editReply({
				content: `There was an error \n\n ${error}`,
				ephemeral: true,
			});
		}
	},
};
