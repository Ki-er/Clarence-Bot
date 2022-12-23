const { ChangeFirstLetterToUpperCase } = require('../../utils/Weather');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const weather = require('openweather-apis');

module.exports = {
	...new SlashCommandBuilder()
		.setName('weather')
		.setDescription('Show current weather of city')
		.addStringOption((option) =>
			option.setName('city').setDescription('Name of City').setRequired(true)
		),

	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */

	run: async (client, interaction) => {
		const APIKey = process.env.OPEN_WEATHERS_API;
		const cityInputted = interaction.options.getString('city');

		weather.setLang('en');
		weather.setCity(cityInputted);
		weather.setUnits('metric');
		weather.setAPPID(APIKey);

		//get all weather info
		weather.getAllWeather(function (err, JSONObj) {
			if (err != null) {
				interaction.reply({ content: `${err}` });
			} else {
				const ISO = JSONObj.sys.country;

				const embed = new MessageEmbed()
					.setColor('ORANGE')
					.setTitle(`Weather of ${cityInputted}, ${ISO}`)
					.setDescription(
						`${parseInt(JSONObj.main.temp)} °C ${ChangeFirstLetterToUpperCase(
							JSONObj.weather[0].description
						)}
						\r\n
						Speed of Wind : ${parseInt(JSONObj.wind.speed)} m/s 
						Humidity: ${JSONObj.main.humidity}% 
						Pressure: ${JSONObj.main.pressure}hPa`
					)
					.setThumbnail(
						`https://github.com/gosquared/flags/blob/master/flags/flags-iso/flat/64/${ISO}.png?raw=true`
					)
					.setImage(`http://openweathermap.org/img/wn/${JSONObj.weather[0].icon}@2x.png`);

				interaction.reply({ embeds: [embed] });
			}
		});
	},
};
