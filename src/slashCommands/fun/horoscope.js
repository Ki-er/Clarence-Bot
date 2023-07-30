require('dotenv').config();
const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

module.exports = {
	...new SlashCommandBuilder()
		.setName('horoscope')
		.setDescription('Get a horoscope.')
		.addStringOption((option) =>
			option
				.setName('sign')
				.setDescription('The sign')
				.setRequired(true)
				.addChoices(
					{ name: 'Aries', value: 'aries' },
					{ name: 'Taurus', value: 'taurus' },
					{ name: 'Gemini', value: 'gemini' },
                    { name: 'Cancer', value: 'cancer' },
					{ name: 'Leo', value: 'leo' },
					{ name: 'Virgo', value: 'virgo' },
					{ name: 'Libra', value: 'libra' },
					{ name: 'Scorpio', value: 'scorpio' },
					{ name: 'Sagittarius', value: 'sagittarius' },
					{ name: 'Capricorn', value: 'capricorn' },
                    { name: 'Aquarius', value: 'aquarius' },
                    { name: 'Pisces', value: 'pisces' },
				)
		),

	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */

	run: async (client, interaction) => {
		const signInputted = interaction.options.getString('sign');


		const RAPID_API = process.env.RAPID_API;

		await interaction.deferReply({
			ephemeral: true,
		});

        const options = {
            method: 'GET',
            url: `https://horoscopes-ai.p.rapidapi.com/get_horoscope_en/${signInputted}/today/general`,
            headers: {
              'X-RapidAPI-Key': RAPID_API,
              'X-RapidAPI-Host': 'horoscopes-ai.p.rapidapi.com'
            }
          };

		try {
			const response = await axios.request(options);
			console.log(response.data);

			interaction.editReply({
				content: `Your horoscope for the day is: \n\n ${response.data.general}`,
            });
		} catch (error) {
			interaction.editReply({
				content: `There was an error \n\n ${error}`,
				ephemeral: true,
			});
		}
	},
};
