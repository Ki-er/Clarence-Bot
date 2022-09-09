const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
	name: 'colours',
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
				.setCustomId('colours')
				.setPlaceholder('Select a colour ')
				.addOptions([
					{
						label: 'Light Blue',
						value: 'colourLB',
						id: 'colourLB',
					},
					{
						label: 'Aqua',
						value: 'colourAqua',
						id: 'colourAqua',
					},
					{
						label: 'Teal',
						value: 'colourTeal',
						id: 'colourTeal',
					},
					{
						label: 'Red',
						value: 'colourRed',
						id: 'colourRed',
					},
					{
						label: 'Pastel Orange',
						value: 'colourOrange',
						id: 'colourOrange',
					},
					{
						label: 'Yellow',
						value: 'colourYellow',
					},
					{
						label: 'Pink',
						value: 'colourPink',
					},
					{
						label: 'Magenta',
						value: 'colourMagenta',
					},
					{
						label: 'Spring Green',
						value: 'colourGreen',
					},
					{
						label: 'Silver',
						value: 'colourSilver',
					},
					{
						label: 'Dark Grey',
						value: 'colourDG',
					},
					{
						label: 'Brown',
						value: 'colourBrown',
					},
				])
		);

		message.channel.send({
			content: 'Select a Colour (May take a couple seconds to update.)',
			components: [row],
		});
	},
};
