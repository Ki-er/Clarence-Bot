const { SlashCommandBuilder } = require('@discordjs/builders');
const lyricssearchermusixmatch = require('lyrics-searcher-musixmatch').default

module.exports = {
	...new SlashCommandBuilder()
		.setName('lyrics')
		.setDescription('Search lyrics')
        .addStringOption((option) =>
        option
            .setName('song')
            .setDescription('song which you want lyrics')
            .setRequired(true)
        ),

	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (client, interaction) => {
		const song = interaction.options.getString('song');

		await interaction.deferReply({
			ephemeral: true,
		});
		
        let outputLyrics = lyricssearchermusixmatch(`${song}`)
        .then((lyrics) => console.log(lyrics))
        .catch(console.warn)

		interaction.editReply({
			content: `${outputLyrics}`,
			ephemeral: true,
		});
	}
};
