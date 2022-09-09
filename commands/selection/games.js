const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
	name: 'games',
	aliases: [''],
	/**
	 *
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message) => {
		const row = new MessageActionRow().addComponents(
			new MessageSelectMenu()
				.setCustomId('games')
				.setPlaceholder('Select some games')
				.setMinValues(0)
				.setMaxValues(2)
				.addOptions([
					{
						label: 'Rainbow Six Siege',
						value: 'R6',
						id: 'R6',
					},
					{
						label: 'MineCraft',
						value: 'MineCraft',
						id: 'gameMineCraft',
					},
				])
		);

		message.channel.send({
			content: 'Select some games (You need the role to see it)',
			components: [row],
		});
	},
};
