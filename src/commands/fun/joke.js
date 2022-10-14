const { MessageEmbed } = require('discord.js');
const axios = require(`axios`);

module.exports = {
	name: 'joke',
	aliases: [''],
	run: async (client, message) => {
		// Call the Joke API and get a random joke excluding the NSFW ones and other categories
		let url = `https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,sexist,explicit`;
		await axios({
			method: 'get',
			url: url,
		})
			.then((response) => {
				let description = '';
				// If the joke is a single joke
				if (response.data.type === 'single') {
					description = response.data.joke;
				} else {
					// If the joke is a two-part joke
					description = `${response.data.setup}\n${response.data.delivery}`;
				}
				// Create an embed with the joke
				const embed = new MessageEmbed()
					.setColor('ORANGE')
					.setFooter({ text: `Called By: ${message.author.tag}` })
					.setTimestamp()
					.setTitle(`**Random Joke**`)
					.setDescription(`${description}`);
				message.channel.send({ embeds: [embed] });
			})
			.catch(() => {
				// If the API is down or something else happens
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
