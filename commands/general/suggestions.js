const { Message, Client, MessageEmbed } = require("discord.js");
const discord = require('discord.js')

module.exports = {
    name: "suggestion",
    aliases: ['suggest'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        if(message.guild && message.guild.id === '744586833135927366')
        {
            const suggestChannel = client.channels.cache.get('858348481412726794')
            let messageArgs = args.join(' ');
            const embed = new discord.MessageEmbed()
            .setColor('ORANGE')
            .setFooter(`ID: ${message.author.id}`)
            .setTimestamp()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(messageArgs);
    
            suggestChannel.send({ embeds: [embed] }).then((msg) =>{
                msg.react('👍');
                msg.react('👎');
                message.delete();
            }).catch((err)=>{
                throw err;
            });
        }
        else
        {
            message.reply("That is not available within this server")
        }




    }
}




