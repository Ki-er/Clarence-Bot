const guildSchema = require('../../schemas/guild-schema');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	...new SlashCommandBuilder()
		.setName('suggestion')
		.setDescription('Post a suggestion')
		.addStringOption((option) =>
			option
				.setName('string')
				.setDescription('string for suggestion')
				.setRequired(true)
		),

	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (client, interaction) => {
		const string = interaction.options.getString('string');

		const data = await guildSchema.findById(interaction.guild.id);
		if (!data)
			return interaction.reply({
				content: `:x: There is no channel for this suggestion. Please ask an administrator to run /config!`,
				ephemeral: true,
			});

		const suggestionChannel = interaction.guild.channels.cache.get(
			data.suggestionChannelId
		);

		const threadAuthor = interaction.user.tag;

		const embed = new MessageEmbed()
			.setColor('ORANGE')
			.setTimestamp()
			.setAuthor(
				interaction.user.tag,
				interaction.user.displayAvatarURL({ dynamic: true })
			)
			.setDescription(string);

		suggestionChannel
			.send({ embeds: [embed] })
			.then((msg) => {
				msg.react('<:upvote:881547644672024607>');
				msg.react('<:downvote:881547582650851330>');
				msg.startThread({
					name: `${threadAuthor} - ${string}`,
					autoArchiveDuration: 60,
					type: 'GUILD_PUBLIC_THREAD',
				});

				interaction.reply({
					content: `Your suggestion has been sent to: ${suggestionChannel}`,
					ephemeral: true,
				});
			})
			.catch((err) => {
				throw err;
			});
	},
};
