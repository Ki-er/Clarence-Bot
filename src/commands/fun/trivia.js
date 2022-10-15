const { MessageEmbed } = require('discord.js');
const axios = require(`axios`);

module.exports = {
	name: 'trivia',
	aliases: [''],
	run: async (client, message) => {
		// Call the Joke API and get a random joke excluding the NSFW ones and other categories
		let url = `https://opentdb.com/api.php?amount=1&type=boolean`;
		await axios({
			method: 'get',
			url: url,
		})
			.then((response) => {
				let description = response.data.results[0].question;
				// Create an embed with the joke
				const embed = new MessageEmbed()
					.setColor('ORANGE')
					.setFooter({ text: `Called By: ${message.author.tag}` })
					.setTimestamp()
					.setTitle(`**Trivia Question**`)
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
						`The Trivia Joke API did not response :( Try again later!`
					);
				message.channel.send({ embeds: [embed] });
			});
	},
};
