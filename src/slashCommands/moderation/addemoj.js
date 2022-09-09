const { Util } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
	...new SlashCommandBuilder()
		.setName('addemoji')
		.setDescription('Add an emoji to the server')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageEmojisAndStickers)
		.addStringOption((option) =>
			option
				.setName('emoji')
				.setDescription('emoji which you want to add to the server')
				.setRequired(true)
		),

	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (interaction) => {
		const emoji = interaction.options.getString('emoji');
		const emojiName = interaction.options.getString('emoji_name');
		const parseCustomEmoji = Util.parseEmoji(emoji);
		if (parseCustomEmoji.id) {
			const emojiLink = `https://cdn.discordapp.com/emojis/${
				parseCustomEmoji.id
			}.${parseCustomEmoji.animated ? 'gif' : 'png'}`;
			const createEmoji = await interaction.guild.emojis.create(
				emojiLink,
				emojiName || parseCustomEmoji.name
			);
			interaction.reply({
				content: `Added  ${createEmoji} - ${createEmoji.name} to the server`,
			});
		} else {
			interaction.reply({
				content: ':x: Not a valid emoji',
				ephemeral: true,
			});
		}
	},
};
