const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const client = require("../../index");
const blames = require('../../schemas/blamestitch-schema');

module.exports = {
    name: "blamescan",
    description: "Scan blames",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const blame = await blames.find({});
        await interaction.reply(`Stitch has been blamed ${19 + blame.length} times.\r\nThere were 19 blames before the database.\r\nGetting all database blames, this may take a while.`)


        for(let i = 0; i < blame.length; ++i) {
            const embed = new MessageEmbed()
                .setColor('ORANGE')
                .setFooter({ text: `Called By: ${interaction.user.tag}`})                   
                .setTimestamp()
                .addField('Reason:', `${blame[i].reason}`)
                .addField('Date', `${blame[i].date.toLocaleDateString("en-UK")}`)
                .addField('Added by', `<@${blame[i].userId}>`);
            interaction.channel.send({ embeds: [embed] });
        }
    }
}; 