const { MessageEmbed } = require('discord.js');
const axios = require(`axios`);
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	...new SlashCommandBuilder()
		.setName('trivia')
		.setDescription('Get a Trivia Question'),
	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (client, interaction) => {
		// Call the Trivia API
		let url = `https://opentdb.com/api.php?amount=1&type=boolean`;
		await interaction.deferReply();
		await axios({
			method: 'get',
			url: url,
		})
			.then(async (response) => {
				let description = response.data.results[0].question;
				//replace "quot" with " "
				description = description.replace(/&quot;/g, '"');
				// Create an embed with the joke
				const embed = new MessageEmbed()
					.setColor('ORANGE')
					.setFooter({ text: `Called By: ${interaction.user.tag}` })
					.setTimestamp()
					.setTitle(`**Trivia Question**`)
					.setDescription(`${description}`);
				await interaction.editReply({ embeds: [embed] });
				// Type t to signify true and f to signify false
				// If the user does not respond in 30 seconds, the interaction will be ended
				const filter = (m) => m.author.id === interaction.user.id;
				const collector = interaction.channel.createMessageCollector({
					filter,
					time: 30000,
				});
				collector.on('collect', async (m) => {
					// If the user responds with t or f, the interaction will be ended
					if (m.content === 't' || m.content === 'f') {
						collector.stop();
						// If the user's answer is correct, send a correct embed
						if (
							(m.content === 't' &&
								response.data.results[0].correct_answer === 'True') ||
							(m.content === 'f' &&
								response.data.results[0].correct_answer === 'False')
						) {
							const embed = new MessageEmbed()
								.setColor('GREEN')
								.setFooter({
									text: `Called By: ${interaction.user.tag}`,
								})
								.setTimestamp()
								.setTitle(`**Correct!**`)
								.setDescription(
									`The answer was ${response.data.results[0].correct_answer}`
								);
							await interaction.editReply({ embeds: [embed] });
						}
						// If the user's answer is incorrect, send an incorrect embed
						else {
							const embed = new MessageEmbed()
								.setColor('RED')
								.setFooter({
									text: `Called By: ${interaction.user.tag}`,
								})
								.setTimestamp()
								.setTitle(`**Incorrect!**`)
								.setDescription(
									`The answer was ${response.data.results[0].correct_answer}`
								);
							await interaction.editReply({ embeds: [embed] });
						}
					}
				});
			})
			.catch(() => {
				// If the API is down or something else happens
				const embed = new MessageEmbed()
					.setColor('ORANGE')
					.setFooter({ text: `Called By: ${interaction.user.tag}` })
					.setTimestamp()
					.setTitle(`**Sorry!**`)
					.setDescription(
						`The Trivia API did not response :( Try again later!`
					);
				interaction.editReply({ embeds: [embed] });
			});
	},
};
