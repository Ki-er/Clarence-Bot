const { Message, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "8ball",
    aliases: ['8b'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const Responses = [
            "Yes", 
            "No", 
            "Maybe", 
            "It is likely",
            "It is unlikely"
            ];

            let messageArgs = args.join(' ');
            if (!messageArgs[1]) return message.reply('Please specify a topic.');

            const embed = new MessageEmbed()
            .setColor('ORANGE')
            .setFooter({text: `Called By: ${message.author.tag}`})            
            .setTimestamp()
            .setTitle("8Ball")
            .addField(`${messageArgs}`,`${Responses[Math.floor(Math.random() * Responses.length)]}`)
            
        message.channel.send({ embeds: [embed] })
    },
};
