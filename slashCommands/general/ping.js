const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Output ping to Clarence",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

        const embed = new MessageEmbed()
        .setColor('ORANGE')
        .setFooter({ text: `Called By: ${interaction.user.tag}`})
        .setTimestamp()
        .setTitle("Pong!")
        .setDescription(`${client.ws.ping} ping to host`)
        .addField('Uptime', ` ${days}days ${hours}hrs ${minutes}min ${seconds}sec`, true)
        interaction.reply({ embeds: [embed]});
    },
};