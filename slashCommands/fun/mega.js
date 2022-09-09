module.exports = {
	name: 'mega',
	description: 'Mega Pint!',
	type: 'CHAT_INPUT',
	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (client, interaction, args) => {
		interaction.reply({
			content: `https://c.tenor.com/7_6SE-1lyT0AAAAd/johnny-depp.gif`,
		});
	},
};
