const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const Levels = require('discord-xp');

module.exports = {
	...new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('shows user leaderboard based on their XP'),

	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (client, interaction) => {

		const rawLeaderboard = await Levels.fetchLeaderboard(interaction.guild.id, 5); //prvych 5 ludi
        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);
        
        if(rawLeaderboard.length < 1) {
            const embed = new MessageEmbed()
					.setColor('RED')
					.setFooter({ text: `Called By: ${interaction.user.tag}` })
					.setTimestamp()
					.setTitle(`The leaderboard is empty`)

		    interaction.reply({ embeds: [embed] });
        }

        const l = leaderboard.map(e => `${e.position}, ${e.username}#${e.discriminator} -> Level: ${e.level} -> Xp: ${e.xp.toString()}`);
        
        const embed = new MessageEmbed()
					.setColor('BLUE')
					.setFooter({ text: `Called By: ${interaction.user.tag}` })
					.setTimestamp()
					.setTitle(`XP leaderboard`)
                    .setDescription(`${l.join("\n\n")}`);

		interaction.reply({ embeds: [embed] });
    },
};