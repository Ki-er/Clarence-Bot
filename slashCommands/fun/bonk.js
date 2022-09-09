module.exports = {
	name: 'bonk',
	description: 'Go to horny jail',
	type: 'CHAT_INPUT',

	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */

	run: async (client, interaction) => {
		interaction.reply({ content: `https://tenor.com/bkKml.gif` });
	},
};
