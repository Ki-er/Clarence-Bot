require('dotenv').config();
const axios = require('axios');
const { SlashCommandBuilder } = require('discord.js');
const SHORTURL_API_KEY = process.env.SHORTURL_API_KEY;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('linkshorten')
		.setDescription('Shorten links!')
		.addStringOption((option) =>
			option
				.setName('link')
				.setDescription(
					'The destination URL you want your branded short link to point to'
				)
				.setRequired(true)
		),
	async execute(interaction) {
		await interaction.deferReply();
		const link = interaction.options.getString('link');
		const url = 'https://url-link-shortener.p.rapidapi.com/v1/links/new';
		const headers = {
			'X-RapidAPI-Key': SHORTURL_API_KEY,
			'X-RapidAPI-Host': 'url-link-shortener.p.rapidapi.com',
		};
		const params = {
			destination: link,
		};
		try {
			const response = await axios.get(url, { headers, params });
			const shortenedLink = response.data.result_url;
			await interaction.editReply(
				`Here's your shortened link: ${shortenedLink}`
			);
		} catch (error) {
			console.error(error);
			await interaction.editReply('Failed to shorten given link!');
		}
	},
};
