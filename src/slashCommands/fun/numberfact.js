const { MessageEmbed } = require('discord.js');
const axios = require(`axios`);
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	...new SlashCommandBuilder()
		.setName('numberfact')
		.setDescription('Get a Random Number fact'),

	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */

	run: async (client, interaction) => {
		await interaction.deferReply();
		const number = Math.round(Math.random() * 101);
		const url = `http://numbersapi.com/${number}`;
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
			interaction.editReply({ embeds: [embed] });
		});
	},
};
