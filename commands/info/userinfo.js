const { Message, Client, MessageEmbed, Permissions } = require("discord.js");
const moment = require('moment');
const discord = require('discord.js')


module.exports = {
    name: "userinfo",
    aliases: [''],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let member3 = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member3) member3 = message.member;
        let memberTargetID = message.guild.members.cache.get(member3.id);
        if (!memberTargetID) memberTargetID = message.author.id;
 
        const target_avatar = memberTargetID.user.displayAvatarURL({dynamic: true, size: 2048})
 
 
        let rolemap_size = memberTargetID.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(r => `${r}`)
        .slice(0, -1)
        .join(' ')
        
        if (!rolemap_size) rolemap_size = "No roles to display";
 
          const account_age = `${((Date.now() - memberTargetID.user.createdAt) / 1000 / 60 / 60 / 24 + '.0').toString().split('.')[0]} days`
          let isBot = false
 
          if (memberTargetID.user.bot) isBot = true
          
          const status = memberTargetID.presence.status;
          var game = memberTargetID.presence.activities[0] ? memberTargetID.presence.activities[0].name : `User isn't playing a game`
 
          let status_embed;
 
          if(status == 'dnd') status_embed = "<:dnd:881522766472441886>" // if the person is dnd  so it will type in the embed Do no Distrub
          if(status == 'online') status_embed = "<:online:881595015875416095>"
          if(status == 'offline') status_embed = "<:offline:881596009069817907>"
          if(status === 'idle') status_embed = "<:idle:881595951419105331>"
 
          var Account_CreatedAt = memberTargetID.user.createdAt.toString().slice(-55, +24);
 
          const embed = new discord.MessageEmbed()
              .setTitle(`${status_embed} ${memberTargetID.user.tag}`)
              .setURL(`${memberTargetID.user.avatarURL({dynamic: true})}`)
              .setColor('ORANGE')
              .setFooter(`Called By: ${message.author.tag}`)
              .setThumbnail(memberTargetID.user.displayAvatarURL())
              .setTimestamp()
              .addField("Username",`${memberTargetID.user.username}`)
              .addField('Nickname', memberTargetID.nickname ? memberTargetID.nickname : 'User has no nickname')
              .addField("ID",`${memberTargetID.user.id}`)
              .addField('Game', game)
              .addField('Joined at: ',`${moment(memberTargetID.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`)
              .addField("Created at: ",`${moment(Account_CreatedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`)
              .addField("Account age: ",`${account_age}`)
              .addField("Bot?", `${isBot}`)
              .addField("Avatar URL", `[Link](${memberTargetID.user.avatarURL({dynamic: true})})`, true)
              .addField(`Roles [${memberTargetID.roles.cache.size-1}]`,`${rolemap_size}`)

    
              message.channel.send({ embeds: [embed] });
            },
};
