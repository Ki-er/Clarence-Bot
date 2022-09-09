const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
	name: 'age',
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
				.setCustomId('age')
				.setPlaceholder('Select an age range')
				.addOptions([
					{
						label: '13-16',
						value: '13',
					},
					{
						label: '17-20',
						value: '17',
					},
					{
						label: '21-24',
						value: '21',
					},
					{
						label: '25-28',
						value: '25',
					},
					{
						label: '28-30',
						value: '28',
					},
					{
						label: '30+',
						value: '30',
					},
				])
		);

		message.channel.send({
			content: 'Select your age range',
			components: [row],
		});
	},
};
