const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const canvacord = require('canvacord');
const Levels = require('discord-xp');

module.exports = {
	...new SlashCommandBuilder()
		.setName('rank')
		.setDescription('shows XP rank (level) of the selected user')
		.addUserOption((option) =>
			option
				.setName('user')
				.setDescription('user, whose level you want to know')
				.setRequired(true)
		),

	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (client, interaction) => {

		const inputUser = interaction.options.getMember('user');

        // await interaction.deferReply();

        let memberTarget = interaction.guild.members.cache.get(inputUser.id);
        const user = await Levels.fetch(inputUser.id, interaction.guild.id, true);
        const neededXP = await Levels.xpFor(parseInt(user.level)+1);
        
        if(user.length < 1) {
            const embed = new MessageEmbed()
					.setColor('RED')
					.setFooter({ text: `Called By: ${interaction.user.tag}` })
					.setTimestamp()
					.setTitle(`XP Rank`)
                    .setDescription(`User: ${memberTarget.user.username} has not sent any message yet`);

		    interaction.reply({ embeds: [embed] });
        }
        
        const embed = new MessageEmbed()
					.setColor('BLUE')
					.setFooter({ text: `Called By: ${interaction.user.tag}` })
					.setTimestamp()
                    .setThumbnail(memberTarget.displayAvatarURL())
					.setTitle(`XP Rank`)
                    .setFields(
                        {name: 'User', value: `${memberTarget.user.username}`},
                        {name: 'XP', value: `${user.xp}`},
                        {name: 'Level', value: `${user.level}`},
                        {name: 'Next level in', value: `${neededXP}`}
                    )

		interaction.reply({ embeds: [embed] });
    },
};