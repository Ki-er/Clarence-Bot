const { Message, Client, Permissions } = require("discord.js");
const Discord = require('discord.js')

module.exports = {
    name: "addemoji",
    aliases: [''],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
      if(!message.member.permissions.has(Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS, Permissions.FLAGS.ADMINISTRATOR))
      message.channel.send("You don't have permission to use that command.");
  
      else {
        if (!args.length) return message.channel('Please specify an emoji!!')

        for (const emojis of args) {
          const getEmoji = Discord.Util.parseEmoji(emojis);
    
          if (getEmoji.id) {
            const emojiExt = getEmoji.animated ? ".gif" : ".png";
            const emojiURL = `https://cdn.discordapp.com/emojis/${getEmoji.id + emojiExt}`
  
            message.guild.emojis.create(emojiURL, getEmoji.name).then(emoji => 
              message.channel.send(`Successfully added: ${emoji} - ${emoji.name} to the server!!`))
          }
      }


    };
  }
}