const discord = require("discord.js");

module.exports = {
    name: "buy",
    aliases: ['paid'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const embed = new discord.MessageEmbed()
        .setTitle("Thanks for considering to become a paid member!")
        .setColor('GREEN')
        .setFooter(`Called By: ${message.author.tag}`)
        .addField('You can purchase from below!','https://hulluniunion.com/shop?aid=304')
        message.channel.send({ embeds: [embed] });
    }
}
