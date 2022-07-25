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
            const threadAuthor = message.member.displayName;
            const embed = new discord.MessageEmbed()
            .setColor('ORANGE')
            .setFooter({
                text: `Called By: ${message.author.tag}`
            })                   
            .setTimestamp()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(messageArgs);
    
            suggestChannel.send({ embeds: [embed] }).then((msg) =>{
                msg.react('<:upvote:881547644672024607>');
                msg.react('<:downvote:881547582650851330>');
                msg.startThread({
                    name: `${threadAuthor} - ${messageArgs}`,
                    autoArchiveDuration: 60,
                    type: 'GUILD_PUBLIC_THREAD'
                });

                message.delete();
                message.channel.send('Your suggestion has been sent to: <#858348481412726794>')
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




