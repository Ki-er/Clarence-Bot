const { MessageEmbed } = require('discord.js');
const axios = require(`axios`);
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	...new SlashCommandBuilder()
		.setName('joke')
		.setDescription('Get a Random Joke'),
	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (client, interaction) => {
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
					.setFooter({ text: `Called By: ${interaction.user.tag}` })
					.setTimestamp()
					.setTitle(`**Random Joke**`)
					.setDescription(`${description}`);
				interaction.reply({ embeds: [embed] });
			})
			.catch(() => {
				const embed = new MessageEmbed()
					.setColor('ORANGE')
					.setFooter({ text: `Called By: ${interaction.user.tag}` })
					.setTimestamp()
					.setTitle(`**Sorry!**`)
					.setDescription(
						`The Random Joke API did not response :( Try again later!`
					);
				interaction.reply({ embeds: [embed] });
			});
	},
};
