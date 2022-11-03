const movie = require("node-movie");

const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	...new SlashCommandBuilder()
		.setName('imdb')
		.setDescription('Get information about Tv shows and movies')
		.addStringOption((option) => 
			option
				.setName('name')
				.setDescription('Name of the movie or Tv show')
				.setRequired(true)
		),

	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (client, interaction) => {

		const movieName = interaction.options.getString('name');
		await interaction.deferReply();

		movie(movieName, data => {

			if (data.Response == 'True'){

				const embed = new MessageEmbed()
					.setColor('GREEN')
					.setTitle(`${data.Title} (${data.Type})\nYear: ${data.Year}`)
					.setDescription(`
						Id: ${data.imdbID}\n
						Genre: ${data.Genre}\n
						Country: ${data.Country}\n
						Runtime: ${data.Runtime}\n
						Description: ${data.Plot}\n
						Actors: ${data.Actors}\n
						Awards: ${data.Awards}\n
						Rating: ${data.imdbRating}`)
					.setFooter({ text: `Called By: ${interaction.user.tag}` })
					.setTimestamp();
				
					if (data.Poster != 'N/A')
						embed.setImage(data.Poster);
				
				interaction.editReply({ embeds: [embed] });
			} else if (data.Response == 'False') {

				const embed = new MessageEmbed()
					.setColor('RED')
					.setTitle(`${data.Error}`)
					.setDescription(`selected name: ${movieName}`)
					.setFooter({ text: `Called By: ${interaction.user.tag}` })
					.setTimestamp();
				
				interaction.editReply({ embeds: [embed] });
			} else {

				const embed = new MessageEmbed()
					.setColor('ORANGE')
					.setTitle(`Something went wrong :(`)
					.setFooter({ text: `Called By: ${interaction.user.tag}` })
					.setTimestamp();
				
				interaction.editReply({ embeds: [embed] });
			}
		});
	},
};
