const { Message, Client, Permissions } = require("discord.js");

module.exports = {
    name: "kick",
    aliases: [''],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

    // the perm. that the member need it to ban someone
    if(!message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS, Permissions.FLAGS.ADMINISTRATOR))
    // if someone dont hv perm it will send this message
    message.channel.send("You don't have permission to use that command.");

    else {
      if (!message.guild) return;
  
      const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  
      if (user) {
  
        const member =message.guild.members.cache.get(user.id);
  
        if (member) {
  
          member
          // kick code 
            .kick('they were bad!')
            .then(() => {
            // it will send this message once the person is kicked
              message.reply(`Successfully kicked`);
            })
            // log err in the console
            .catch(err => {
              // if the bot wasnt able to kick the member bcz he hv a higher role it will not kick him and if the bot dont hv to perm it will not kick him and send this messge
              message.reply('I was unable to kick the member');
  
              console.error(err);
            });
        } else {
          // if the member isnt in the server and u typed e.g. =kick @karimx it will send this message
          message.reply("That user isn't in this guild!");
        }
      } else {
       // if u typed =kick without mentioning some1 it will send this message
        message.reply("You didn't mention the user to kick!");
      }
  };

    },
};
