const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const R6 = require('r6s-stats-api');

module.exports = {
	...new SlashCommandBuilder()
		.setName('r6stats')
		.setDescription('Output the stats from siege')
		.addStringOption((option) =>
			option.setName('user').setDescription('target user').setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName('platform')
				.setDescription('target platform')
				.setRequired(true)
				.addChoices(
					{ name: 'PC', value: 'pc' },
					{ name: 'Xbox', value: 'xbox' },
					{ name: 'PSN', value: 'psn' }
				)
		)
		.addStringOption((option) =>
			option
				.setName('type')
				.setDescription('target type')
				.addChoices(
					{ name: 'Casual', value: 'casual' },
					{ name: 'Unranked', value: 'unranked' },
					{ name: 'Ranked', value: 'ranked' },
					{ name: 'Deathmatch', value: 'deathmatch' }
				)
		),

	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */

	run: async (client, interaction, args) => {
		const inputUser = interaction.options.getString('user');
		const inputPlatform = interaction.options.getString('platform');
		const inputType = interaction.options.getString('type');

		if (inputType == null) {
			const general = await R6.general(inputPlatform, inputUser);
			const embed = new MessageEmbed()
				.setTitle(`General Stats`)
				.setColor('ORANGE')
				.setTimestamp()
				.setThumbnail(general.header)
				.setFooter({ text: `Called By: ${interaction.user.tag}` })
				.addField(`Username`, `${general.name}`)
				.addField(`URL`, `${general.url}`)
				.addField(`Level`, `${general.level}`, true)
				.addField(`Total XP`, `${general.total_xp}`, true)
				.addField(`Matches Played`, `${general.matches_played}`)
				.addField(`Time Played`, `${general.time_played}`)
				.addField(`KD`, `${general.kd}`, true)
				.addField(`Kills`, `${general.kills}`, true)
				.addField(`Deaths`, `${general.deaths}`, true)
				.addField(`Melee Kills`, `${general.melee_kills}`)
				.addField(`Blind Kills`, `${general.blind_kills}`)
				.addField(`Win Percentage`, `${general.win_}`, true)
				.addField(`Wins`, `${general.wins}`, true)
				.addField(`Loses`, `${general.losses}`, true)
				.addField(`Headshot Percentage`, `${general.headshot_}`, true)
				.addField(`Total Headshots`, `${general.headshots}`, true);
			interaction.reply({ embeds: [embed] });
		} else if (inputType == 'casual') {
			const stats = await R6.casual(inputPlatform, inputUser);
			console.log(stats);
			const embed = new MessageEmbed()
				.setTitle(`Casual Stats`)
				.setColor('ORANGE')
				.setTimestamp()
				.setThumbnail(stats.header)
				.setFooter({ text: `Called By: ${interaction.user.tag}` })
				.setImage(stats.rank_img)
				.addField(`Username`, `${stats.name}`)
				.addField(`URL`, `${stats.url}`)
				.addField(`MMR`, `${stats.mmr}`, true)
				.addField(`Rank`, `${stats.rank}`)
				.addField(`Matches Played`, `${stats.matches}`)
				.addField(`Time Played`, `${stats.time_played}`)
				.addField(`KD`, `${stats.kd}`, true)
				.addField(`Kills`, `${stats.kills}`, true)
				.addField(`Deaths`, `${stats.deaths}`, true)
				.addField(`Kills per Match`, `${stats.kills_match}`)
				.addField(`Kills per Minute`, `${stats.kills_min}`)
				.addField(`Win Percentage`, `${stats.win_}`, true)
				.addField(`Wins`, `${stats.wins}`, true)
				.addField(`Loses`, `${stats.losses}`, true);
			interaction.reply({ embeds: [embed] });
		}
	},
};
