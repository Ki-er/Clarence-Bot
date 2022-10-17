const axios = require(`axios`);
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'numberfact',
	aliases: ['n'],
	/**
	 *
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message) => {
		const number = Math.round(Math.random() * 101);
		const url = `http://numbersapi.com/${number}`;
		await axios({
			method: 'get',
			url: url,
		}).then((response) => {
			const embed = new MessageEmbed()
				.setColor('ORANGE')
				.setFooter({ text: `Called By: ${message.author.tag}` })
				.setTimestamp()
				.setTitle(`**Number Fact**`)
				.setDescription(`${response.data}`);
			message.channel.send({ embeds: [embed] });
		});
	},
};
