const { SlashCommandBuilder } = require('@discordjs/builders');
const translate = require('@iamtraction/google-translate');
const { MessageEmbed } = require('discord.js');
const ISO6391 = require('iso-639-1');

module.exports = {
	...new SlashCommandBuilder()
		.setName('translate')
		.setDescription('Translate a phrase')
		.addStringOption((option) =>
			option
				.setName('string')
				.setDescription('string for translation')
				.setRequired(true)
		),

	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (client, interaction) => {
		const inputString = interaction.options.getString('string');

		translate(inputString, { to: 'en' })
			.then((res) => {
				const language = ISO6391.getName(res.from.language.iso); // 'English'

				const embed = new MessageEmbed()
					.setTitle('Translation')
					.setColor('ORANGE')
					.addField(
						`**Translated Text:**`,
						`${res.text.charAt(0).toUpperCase()}${res.text.slice(1)}`
					)
					.addField(
						`**Original Text:**`,
						`${inputString.charAt(0).toUpperCase()}${inputString.slice(1)}`
					)
					.addField(
						`**Language:**`,
						`${language.charAt(0).toUpperCase()}${language.slice(1)}`
					)
					.setFooter({ text: `Called By: ${interaction.user.tag}` })
					.setTimestamp();
				interaction.reply({ embeds: [embed] });
			})
			.catch((err) => {
				console.error(err);
			});
	},
};
