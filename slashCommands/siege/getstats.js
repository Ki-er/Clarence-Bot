const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
require("dotenv").config();

const R6API = require('r6api.js').default;
email = process.env.UBI_EMAIL
password = process.env.UBI_PASSWORD
const r6api = new R6API({ email, password });



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
            .setDescription('target platform')
            .setRequired(true)
            .addChoices(
                { name: 'Uplay', value: 'uplay' },
                { name: 'Xbox', value: 'xbl' },
                { name: 'PSN', value: 'psn' },
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

        const { 0: player } = await r6api.findByUsername(inputPlatform, inputUser);
        if (!player) return interaction.reply({ contents: "Player not found", ephemeral: true });

        const { 0: stats } = await r6api.getStats(inputPlatform, player.id);
        if (!stats) return interaction.reply({ contents: "Stats not found", ephemeral: true });
        const { pvp: { general } } = stats;
        console.log(stats)


        const embed = new MessageEmbed()
        .setTitle(`${player.username} (${player.userId})`)
        .setThumbnail(`https://ubisoft-avatars.akamaized.net/${player.id}/default_146_146.png`)
        .setTimestamp()
        .setColor(`ORANGE`)
        .setFooter({ text: `Called By: ${interaction.user.tag}`})        
        .addField(`Kill Death Assists`, `- KD: ${general.kd}
        - Kills: ${general.kills}\r\n- Deaths: ${general.deaths}
        - Assists: ${general.assists}
        - Suicides: ${general.suicides}
        `)
    
        .addField(`Win Loss`, 
        `- Matches: ${general.matches}
        - Win/Loss: ${general.winRate}
        - Wins: ${general.wins}
        - Losses: ${general.losses}`)

        .addField(`Bullet Stats`, 
        `- Bullets Fired: ${general.bulletsFired}
        - Bullets Connected: ${general.bulletsConnected}
        `)

        .addField(`Down Stats`, 
        `- Down But Not Outs: ${general.dbno}
        - Down But Not Outs Assists: ${general.dbnoAssists}
        `)

        .addField(`Misc Stats`, 
        `- Blind Kills: ${general.blindKills}
        - Penetration Kills: ${general.penetrationKills}
        - Melee Kills: ${general.meleeKills}
        - Rappel Breaches: ${general.rappelBreaches}
        - Gadgets Destroyed: ${general.gadgetsDestroyed}
        - Barricades Deployed: ${general.barricadesDeployed}
        - Reinforcements Deployed: ${general.reinforcementsDeployed}
        
        `)

        interaction.reply({ embeds: [embed] })
        console.log(`${player.username} has played ${general.matches} matches.`) 
        console.log(`${player.username} has played for ${general.playtime}.`)

    },
};