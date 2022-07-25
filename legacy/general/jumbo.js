const { Message, Client, Permissions } = require("discord.js");
const Discord = require('discord.js')
const { parse } = require("twemoji-parser");


module.exports = {
    name: "jumbo",
    aliases: [''],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const emoji = args[0];
        if (!emoji) return message.channel.send("No emoji provided!");
    
        let custom = Discord.Util.parseEmoji(emoji);

    
        if (custom.id) 
        {
            let emoji = (`https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`);
            return message.channel.send(emoji);
        }
        else 
        {
            let parsed = parse(emoji, { assetType: "png" });
            if (!parsed[0]) return message.channel.send("Invalid emoji!");
            return message.channel.send(emoji);
        }

    }
}
