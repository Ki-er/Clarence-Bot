const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'buy',
	description: 'Buy siege from cd keys',
	type: 'CHAT_INPUT',
	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (interaction) => {
		const embed = new MessageEmbed()
			.setColor('ORANGE')
			.setFooter({ text: `Called By: ${interaction.user.tag}` })
			.setTimestamp()
			.setTitle('Purchase')
			.addField(
				`While Kieran and others are not affiliated with CD Keys, we have had good experiences with CD keys, buy siege here: `,
				`https://www.cdkeys.com/tom-clancy-s-rainbow-six-siege-pc-cd-key-uplay`
			);
		interaction.reply({ embeds: [embed] });
	},
};
