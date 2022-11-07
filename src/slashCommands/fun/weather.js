const { ChangeFirstLetterToUpperCase } = require('../../utils/Weather');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const weather = require('openweather-apis');

// Generate one via : https://openweathermap.org/appid
const APIKey = process.env.OPEN_WEATHERS_API;

module.exports = {
	...new SlashCommandBuilder()
		.setName('weather')
		.setDescription('Show current weather of city')
		.addStringOption((option) =>
			option.setName('string').setDescription('Name of City').setRequired(true)
		),
	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (client, interaction) => {
		const city = interaction.options.getString('string');

		weather.setLang('en');
		weather.setCity(city);
		weather.setUnits('metric');
		weather.setAPPID(APIKey);

		//get all weather info
		weather.getAllWeather(function (err, JSONObj) {
			if (err != null) {
				interaction.reply({ content: `${err}` });
			} else {
				const embed = new MessageEmbed()
					.setColor('ORANGE')
					.setFooter({
						text: `Speed of Wind : ${parseInt(
							JSONObj.wind.speed
						)} m/s · Humidity: ${JSONObj.main.humidity}% · Pressure: ${
							JSONObj.main.pressure
						}hPa `,
					})
					.setTitle(`Weather of ${city}`)
					.setDescription(
						`${parseInt(JSONObj.main.temp)} °C ${ChangeFirstLetterToUpperCase(
							JSONObj.weather[0].description
						)}`
					)
					.setThumbnail(
						`http://openweathermap.org/img/wn/${JSONObj.weather[0].icon}@2x.png`
					);

				interaction.reply({ embeds: [embed] });
			}
		});
	},
};
