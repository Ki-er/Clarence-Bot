const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
	name: 'pingables',
	aliases: [''],
	/**
	 *
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		const row = new MessageActionRow().addComponents(
			new MessageSelectMenu()
				.setCustomId('pingables')
				.setPlaceholder('Select some pingables')
				.setMinValues(0)
				.setMaxValues(3)
				.addOptions([
					{
						label: 'Small Updates',
						value: 'smallUpdates',
					},
					{
						label: 'Clarence Updates',
						value: 'clarenceUpdates',
					},
					{
						label: 'Random Updates',
						value: 'randomUpdates',
					},
					{
						label: 'All Updates',
						value: 'allUpdates',
					},
				])
		);

		message.channel.send({
			content: 'Select Some Pingables',
			components: [row],
		});
	},
};
