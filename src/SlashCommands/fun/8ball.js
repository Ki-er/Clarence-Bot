const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {


    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const Responses = [
            "Yes", 
            "No", 
            "Maybe", 
            "It is likely",
            "It is unlikely"
            ];

            let messageArgs = args.join(' ');
            const embed = new MessageEmbed()
            .setColor('ORANGE')
            .setFooter(`ID: ${message.author.id}`)
            .setTimestamp()
            .setTitle("8Ball")
            .addField(`${messageArgs}`,`${Responses[Math.floor(Math.random() * Responses.length)]}`)
            
            interaction.followUp({ embeds: [embed] });
    },
};