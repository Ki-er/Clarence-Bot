const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const profiles = require('../../schemas/profile-schema');

module.exports = {
    name: "leaderboard",
    description: "returns levels for this guild",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {

        const leaderboard = await profiles.find({guildId: interaction.guildId}).sort({level: -1}).limit(10)
        const embed = new MessageEmbed()
        .setColor('ORANGE')
        .setFooter({ text: `Called By: ${interaction.user.tag}`})                   
        .setTimestamp()
        .setTitle(`The Top ${((await leaderboard).length)} levels of ${interaction.guild.name}`)

        for(let i = 0; i < (await leaderboard).length; ++i)
        {
            embed.addField(`${i+1}`, `<@${leaderboard[i].userId}> - Level: ${leaderboard[i].level}`)
        }
        interaction.reply({ embeds: [embed] })

    },
}; 