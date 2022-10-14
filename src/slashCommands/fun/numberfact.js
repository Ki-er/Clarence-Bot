const { MessageEmbed } = require('discord.js');
const axios = require(`axios`);
const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
    ...new SlashCommandBuilder()
        .setName('numberfact')
        .setDescription('Get a Random Joke'),

	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */

	run: async (client, interaction) => {
		let number = Math.round(Math.random() * 101);
		let url = `http://numbersapi.com/${number}`;
		await axios({
			method: 'get',
			url: url,
		}).then((response) => {
			const embed = new MessageEmbed()
				.setColor('ORANGE')
				.setFooter({ text: `Called By: ${interaction.user.tag}` })
				.setTimestamp()
				.setTitle(`**Number Fact**`)
				.setDescription(`${response.data}`);
			interaction.reply({ embeds: [embed] });
		});
	},
};
