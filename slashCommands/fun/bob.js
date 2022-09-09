module.exports = {
	name: 'bob',
	description: 'The goodest boy',
	type: 'CHAT_INPUT',
	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (client, interaction, args) => {
		interaction.reply({ files: ['./images/bob.png'] });
	},
};
