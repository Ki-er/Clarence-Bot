const { Message, Client } = require("discord.js");
const translate = require('@iamtraction/google-translate');
const Discord = require('discord.js');
const ISO6391 = require('iso-639-1');


module.exports = {
    name: "translate",
    aliases: ['tr'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const txt = args.join(" ")
        translate(txt, { to: 'en' }).then(res => {

          let language = (ISO6391.getName(res.from.language.iso)); // 'English'


        const embed = new Discord.MessageEmbed()
        .setTitle('Translation')
        .setColor('ORANGE')
        .addField(`**Translated Text:**`, `${res.text.charAt(0).toUpperCase()}${res.text.slice(1)}`)
        .addField(`**Originial Text:**`, `${txt.charAt(0).toUpperCase()}${txt.slice(1)}`)
        .addField(`**Language:**`, `${language.charAt(0).toUpperCase()}${language.slice(1)}`)
        .setFooter(`Called By: ${message.author.tag}`)
        .setTimestamp()

        message.channel.send({ embeds: [embed] });
    
          }).catch(err => {
            console.error(err);
          });
    },
};