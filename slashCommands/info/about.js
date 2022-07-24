const { Client, CommandInteraction } = require("discord.js");

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
        .setDescription('Made by Kieran#0981')
        .addField(`Source Code`,`https://github.com/KieranRobson/Clarence-Bot`)
        .addField(`Privacy policy`,`https://github.com/KieranRobson/Clarence-Bot/blob/master/docs/privacy-policy.md`)
        .addField(`Terms of Service`,`https://github.com/KieranRobson/Clarence-Bot/blob/master/docs/TOS.md`)
        interaction.reply({ embeds: [embed]});

    },
};
