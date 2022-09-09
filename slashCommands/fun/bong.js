const { MessageAttachment } = require('discord.js');

module.exports = {
	name: 'bong',
	description: 'Bong time',
	type: 'CHAT_INPUT',

	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */

	run: async (client, interaction, args) => {
		const Responses = [
			'<@365297607276363776>',
			'<@544191902946164756>',
			'<@652830018858254346>',
		];

		const atta = new MessageAttachment(
			'https://c.tenor.com/9kwNAT9bTkEAAAAC/bong-smoke.gif'
		);
		interaction.reply({
			content: `Time to hit up: ${
				Responses[Math.floor(Math.random() * Responses.length)]
			}`,
			files: [atta],
		});
	},
};
