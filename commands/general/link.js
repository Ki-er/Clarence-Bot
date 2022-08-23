const discord = require("discord.js");

module.exports = {
    name: "links",
    aliases: [''],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const embed = new discord.MessageEmbed()
        .setTitle("Links!")
        .setColor('GREEN')
        .setFooter({ text: `Called By: ${message.author.tag}`}) 
        .addField('Find us here:','https://hullcss.org')
        message.channel.send({ embeds: [embed] });


    },
};
