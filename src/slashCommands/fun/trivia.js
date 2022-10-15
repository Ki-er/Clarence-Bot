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
		try {
			await interaction.deferReply();
			const response = await axios({
				method: 'get',
				url: 'https://opentdb.com/api.php?amount=1&type=boolean',
				responseType: 'json',
			});
			console.log(response.data);
			if (response.response_code) {
				return interaction.editReply({
					content: 'Something went wrong, please try again later!',
				});
			}
			const message = await interaction.editReply({
				content: `${response.data.results[0].question}`,
				fetchReply: true,
			});
			message.react('✅').then(() => message.react('❌'));
			let filter = (reaction, user) => {
				return (
					['✅', '❌'].includes(reaction.emoji.name) &&
					user.id === interaction.user.id
				);
			};
			message
				.awaitReactions({
					filter,
					max: 1,
					time: 10000,
				})
				.then((collected) => {
					const reaction = collected.first();

					if (reaction.emoji.name === '✅') {
						if (response.data.results[0].correct_answer == 'True') {
							message.editReply(`✅ Correct Answer!`);
						} else {
							message.editReply(`❌ Wrong Answer!`);
						}
					} else {
						if (response.data.results[0].correct_answer == 'False') {
							message.editReply(`✅ Correct Answer!`);
						} else {
							message.editReply(`❌ Wrong Answer!`);
						}
					}
				})
				.catch(() => {
					const correct_answer =
						response.data.results[0].correct_answer == 'True' ? '✅' : '❌';
					message.editReply(
						`❌ You failed to react in time! The correct answer was ${correct_answer}`
					);
				});
		} catch (error) {
			console.log(error);
		}
	},
};
