const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	...new SlashCommandBuilder()
		.setName('xpsystem')
		.setDescription('shows actual xp system state and can be used to change it')
		.addBooleanOption((option) =>
			option
				.setName('on')
				.setDescription('used to set xp system on/of')
				.setRequired(true)
		),

	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (client, interaction) => {
		const isOn = interaction.options.getBoolean('on');

		interaction.client.emit('onToggleXp', isOn);

		if (isOn) {
			const embed = new MessageEmbed()
				.setColor('GREEN')
				.setFooter({ text: `Called By: ${interaction.user.tag}` })
				.setTimestamp()
				.setTitle(`XP System is ON!`);
			interaction.reply({ embeds: [embed] });
		} else {
			const embed = new MessageEmbed()
				.setColor('ORANGE')
				.setFooter({ text: `Called By: ${interaction.user.tag}` })
				.setTimestamp()
				.setTitle(`XP System is OFF!`);
			interaction.reply({ embeds: [embed] });
		}
	},
};
