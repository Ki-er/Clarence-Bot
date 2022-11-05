const movie = require('node-movie');

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
		//load movie name from options
		const movieName = interaction.options.getString('name');

		//create and show epmpty embed
		await interaction.deferReply();

		//get movie via node-movie module
		movie(movieName, (data) => {
			if (data.Response == 'True') {
				//response is True so data are OK!
				const embed = new MessageEmbed()
					.setColor('GREEN')
					.setTitle(`${data.Title} (${data.Type})`)
					.setDescription(data.Country)
					.setFields(
						{ name: 'Year', value: data.Year, inline: true },
						{ name: 'Genre', value: data.Genre, inline: true },
						{ name: 'Runtime', value: data.Runtime, inline: true },
						{ name: 'Rating (imDb)', value: data.imdbRating },
						{ name: 'Description', value: data.Plot },
						{ name: 'Actors', value: data.Actors },
						{ name: 'Awards', value: data.Awards }
					)
					.setFooter({ text: `Called By: ${interaction.user.tag}` })
					.setTimestamp();

				//add film poster if exists
				if (data.Poster != 'N/A') embed.setImage(data.Poster);

				//edit embed with info about move
				interaction.editReply({ embeds: [embed] });
			} else if (data.Response == 'False') {
				//if response is false, film was not found
				const embed = new MessageEmbed()
					.setColor('ORANGE')
					.setTitle(`${data.Error}`)
					.setDescription(`selected name: ${movieName}`)
					.setFooter({ text: `Called By: ${interaction.user.tag}` })
					.setTimestamp();

				//edit embed with error message
				interaction.editReply({ embeds: [embed] });
			} else {
				//if data are corrupted, notify about failiure
				const embed = new MessageEmbed()
					.setColor('RED')
					.setTitle(`Something went wrong :(`)
					.setFooter({ text: `Called By: ${interaction.user.tag}` })
					.setTimestamp();

				//update embed
				interaction.editReply({ embeds: [embed] });
			}
		});
	},
};
