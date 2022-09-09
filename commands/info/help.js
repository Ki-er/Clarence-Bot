const discord = require('discord.js');

module.exports = {
	name: 'help',
	aliases: [''],
	/**
	 *
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		if (!args[0]) {
			const embed = new discord.MessageEmbed()
				.setTitle('Clarence Help')
				.setDescription(
					'Select a category from below to see the commands.\r\nThis embed will update.'
				)
				.setColor('ORANGE')
				.setFooter({ text: `Called By: ${message.author.tag}` });

			const row = new discord.MessageActionRow().addComponents(
				new discord.MessageSelectMenu()
					.setCustomId('help')
					.setPlaceholder('Select a help category')
					.addOptions([
						{
							label: 'Admin',
							emoji: '⚒️',
							value: 'admin',
						},
						{
							label: 'General',
							emoji: '📖',
							value: 'general',
						},
						{
							label: 'Fun',
							emoji: '🎉',
							value: 'fun',
						},
						{
							label: 'Info',
							emoji: 'ℹ',
							value: 'info',
						},
						{
							label: 'Siege',
							emoji: '🔫',
							value: 'siege',
						},
					])
			);
			message.channel.send({ embeds: [embed], components: [row] });
		}
	},
};
