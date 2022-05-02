const { Client, Message, MessageEmbed, Permissions } = require('discord.js');

module.exports = {
    name: 'ban',
    aliases: [''],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {

    // the perm. that the member need it to ban someone
    if(!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS, Permissions.FLAGS.ADMINISTRATOR))
    // if someone dont hv perm it will send this message
    message.channel.send("You don't have permission to use that command.");

    else {
      if (!message.guild) return;
  
      const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  
      if (user) {
  
        const member =message.guild.members.cache.get(user.id);
  
        if (member) {
  
          member
          .ban()     
          .then(() => {
              message.reply(`Successfully Banned`);
            })
            .catch(err => {
              message.reply('I was unable to ban the member');
  
              console.error(err);
            });
        } else {
          message.reply("That user isn't in this guild!");
        }
      } else {
        message.reply("You didn't mention the user ban!");
      }
  };

    }
}