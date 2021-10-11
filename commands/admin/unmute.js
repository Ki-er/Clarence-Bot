const { Message, Client } = require("discord.js");
const { Permissions } = require('discord.js');
const discord = require('discord.js');

module.exports = {
    name: "unmute",
    aliases: [''],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
// this code check if the member have the perm to mute or the bot hv the perm to mute ppl
if(!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return;
let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(" ") || x.user.username === args[0])
if(member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) && !message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return;

//it reorgnize the muted role and the member and add the muted and remove the member role
    let mutedRole = message.guild.roles.cache.get('858335519000100864'); // u put the muted role ID
    let verifiedRole = message.guild.roles.cache.get('744587248216834150'); // the member role ID
    if(mutedRole) {
        member.roles.add(verifiedRole);
        member.roles.remove(mutedRole);
// it will send this message once the bot mute the member
        message.reply(`${member} has been unmuted`);

    }
}
}