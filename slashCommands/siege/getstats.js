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
        if (!player) return 'Player not found';

        const { 0: stats } = await r6api.getStats(inputPlatform, player.id);
        if (!stats) return 'Stats not found';
        const { pvp: { general } } = stats;
        
        console.log(`${player.username} has played ${general.matches} matches.`) 
        console.log(`${player.username} has played for ${general.playtime}.`)
        interaction.reply(`${player.username} has played ${general.matches} matches. and has played for ${general.playtime}`)

    },
};