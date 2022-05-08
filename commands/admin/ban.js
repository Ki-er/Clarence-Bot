const { Discord, Client, Message, MessageEmbed, Permissions } = require('discord.js');

module.exports = {
    name: 'ban',
    aliases: [''],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {

      try {
      
        const member = message.mentions.members.first();
        const permission = message.member.permissions.has(Discord.Permissions.FLAGS.BAN_MEMBERS)
      
        if (!permission)
          return message.reply({ 
              contents: "You don't have permission to use this command"
          });
      
        if (!args[0]) return message.reply({ content: `Please specify a user to ban` });
      
        if (!member) return message.reply({ content: `💤 | Cannot find that user...` } );
      
        if (member.id === message.author.id)
          return message.reply({ content: `You cannot ban yourself!` });
      
        if (message.member.roles.highest.position < member.roles.highest.position)
          return message.reply({
            content: `You cannot ban user who have higher role than you...`
          });
      
        if (!member.bannable) return message.reply({ content: `I cannot ban that member`});
      
        return (
          (await member.ban()) +
          message
            .reply({
              content: `User ${member} has been banned`
            })
            .then((msg) => {
              setTimeout(() => msg.delete(), 5000);
            })
        );
          } catch(err) {
            message.reply({ content: `This command is currently being worked on.` })
          }

    }
}