const { MessageEmbed } = require('discord.js');
const axios = require(`axios`);

module.exports = {
	name: 'joke',
	aliases: ['n'],
	run: async (client, message) => {
		let url = `https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,sexist,explicit`;
		await axios({
			method: 'get',
			url: url,
		})
			.then((response) => {
				let description = '';
				if (response.data.type === 'single') {
					description = response.data.joke;
				} else {
					description = `${response.data.setup}\n${response.data.delivery}`;
				}
				const embed = new MessageEmbed()
					.setColor('ORANGE')
					.setFooter({ text: `Called By: ${message.author.tag}` })
					.setTimestamp()
					.setTitle(`**Random Joke**`)
					.setDescription(`${description}`);
				message.channel.send({ embeds: [embed] });
			})
			.catch(() => {
				const embed = new MessageEmbed()
					.setColor('ORANGE')
					.setFooter({ text: `Called By: ${message.author.tag}` })
					.setTimestamp()
					.setTitle(`**Sorry!**`)
					.setDescription(
						`The Random Joke API did not response :( Try again later!`
					);
				message.channel.send({ embeds: [embed] });
			});
	},
};
