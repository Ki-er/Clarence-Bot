const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "about",
    description: "returns information about Clarence",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const embed = new MessageEmbed()
        .setColor('ORANGE')
        .setFooter({ text: `Called By: ${interaction.user.tag}`})         
        .setTimestamp()
        .setTitle("About")
        .setDescription('Clarence is a multipurpose bot with many features ranging from moderation to fun to info! Use `/` to find out what commands Clarence can do!\r\n\r\n Made by [Kieran#0981](https://discord.com/users/360860744977350657)\r\n\r\n')
        .addField(`Source Code`,`https://github.com/KieranRobson/Clarence-Bot`)
        .addField(`Privacy policy`,`https://github.com/KieranRobson/Clarence-Bot/blob/master/docs/privacy-policy.md`)
        .addField(`Terms of Service`,`https://github.com/KieranRobson/Clarence-Bot/blob/master/docs/TOS.md`)
        interaction.reply({ embeds: [embed]});

    },
};
