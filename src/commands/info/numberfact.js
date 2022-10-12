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
		const days = Math.floor(client.uptime / 86400000);
		const hours = Math.floor(client.uptime / 3600000) % 24;
		const minutes = Math.floor(client.uptime / 60000) % 60;
		const seconds = Math.floor(client.uptime / 1000) % 60;

		let number = Math.round(Math.random() * 101);
		console.log(url);
		await axios({
			method: 'get',
			url: url,
		})
			.then((response) => {
				const embed = new MessageEmbed()
					.setColor('ORANGE')
					.setFooter({ text: `Called By: ${message.author.tag}` })
					.setTimestamp()
					.setTitle(`${response.data}`)
					.setDescription(`${client.ws.ping} ping to host`)
					.addField(
						'Uptime',
						` ${days}days ${hours}hrs ${minutes}min ${seconds}sec`,
						true
					);
				message.channel.send({ embeds: [embed] });
			})
			.catch((error) => {
				message.channel.send(`some error occured`);
			});
	},
};
