const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
    ...new SlashCommandBuilder()
        .setName('cookie')
        .setDescription('give a cookie')
        .addUserOption((option) => option
            .setName('user')
            .setDescription("a user")
            .setRequired(true)
        ),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

        let user = interaction.options.getUser("user")
        const embed = new MessageEmbed()
        .setColor('ORANGE')
        .setFooter({text: `Called By: ${interaction.user.tag}`})        
        .setTimestamp()
        .setTitle("Cookie")
        .setDescription(`${interaction.user.toString()}, has given a cookie to ${user.toString()}`)
        .setImage("https://i.imgur.com/ioaWGdf.png")

        
        interaction.reply({ embeds: [embed] })

    },
};