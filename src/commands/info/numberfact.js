const { MessageEmbed } = require('discord.js');
const axios = require(`axios`);

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
		let number = Math.round(Math.random() * 101);
		let url = `http://numbersapi.com/${number}`;
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
