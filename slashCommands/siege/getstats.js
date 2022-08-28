const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const R6 = require('r6s-stats-api');

module.exports = {
    ...new SlashCommandBuilder()
        .setName('r6stats')
        .setDescription('Output the stats from siege')
        .addStringOption((option) => option
            .setName('user')
            .setDescription("target user")
            .setRequired(true)
        )
        .addStringOption((option) => option
        .setName('platform')
        .setDescription("target platform")
        .setRequired(true)
        )
        .addStringOption((option) => option
            .setName('type')
            .setDescription('target type')
            .addChoices(
                { name: 'Casual', value: 'casual' },
                { name: 'Unranked', value: 'unranked' },
                { name: 'Ranked', value: 'ranked' },
                { name: 'Deathmatch', value: 'deathmatch' },
            )),
        
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    
    run: async (client, interaction, args) => {
        const inputUser = interaction.options.getString("user")
        const inputPlatform = interaction.options.getString("platform")
        const inputType = interaction.options.getString("type")

        if(inputType == null)
        {
            const stats = await R6.general(inputPlatform, inputUser);
            console.log(stats)
            const embed = new MessageEmbed()
            .setTitle(`General Stats`)
            .setColor('ORANGE')
            .setTimestamp()
            .setThumbnail(stats.header)
            .setFooter({ text: `Called By: ${interaction.user.tag}`})
            .addField(`Username`, `${stats.name}`)
            .addField(`URL`, `${stats.url}`)
            .addField(`Level`, `${stats.level}`, true)
            .addField(`Total XP`, `${stats.total_xp}`, true)
            .addField(`Matches Played`, `${stats.matches_played}`)
            .addField(`Time Played`, `${stats.time_played}`)
            .addField(`KD`, `${stats.kd}`, true)
            .addField(`Kills`, `${stats.kills}`, true)
            .addField(`Deaths`, `${stats.deaths}`, true)
            .addField(`Melee Kills`, `${stats.melee_kills}`)
            .addField(`Blind Kills`, `${stats.blind_kills}`)
            .addField(`Win Percentage`, `${stats.win_}`,true)
            .addField(`Wins`, `${stats.wins}`, true)
            .addField(`Loses`, `${stats.losses}`, true)
            .addField(`Headshot Percentage`, `${stats.headshot_}`, true)
            .addField(`Total Headshots`, `${stats.headshots}`, true)
            interaction.reply({embeds: [embed]})
        }
        else if(inputType == 'casual')
        {
            let stats = await R6.casual(inputPlatform, inputUser);
            const embed = new MessageEmbed()
            .setTitle(`Casual Stats`)
            .setColor('ORANGE')
            .setTimestamp()
            .setThumbnail(stats.header)
            .setFooter({ text: `Called By: ${interaction.user.tag}`})
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
            .addField(`Kills per Minute`, `${stats.min}`)
            .addField(`Win Percentage`, `${stats.win_}`,true)
            .addField(`Wins`, `${stats.wins}`, true)
            .addField(`Loses`, `${stats.losses}`, true)

            await  interaction.reply({embeds: [embed]})

        }
    },
};