const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "serverinfo",
    description: "Shows information from mentioned server",

    async run (client, message, args) {
        const owner = await message.guild.fetchOwner();
        const guild = message.guild
        const thumbnail = guild.iconURL()

        let rolemap = message.guild.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(r => r)
        .join(",");
        if (rolemap.length > 1024) rolemap = "Too many roles to display";
        if (!rolemap) rolemap = "No roles";

        let embed = new MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL)
        .setColor('ORANGE')
        .addField(`Owner`, `${owner.user.tag} (${owner.user.id})`)
        .addField('ID', `${guild.id}`)
        .addField('Member Count', `People: ${guild.memberCount - message.guild.members.cache.filter(m=>m.user.bot).size}\r\n Bots: ${message.guild.members.cache.filter(m=>m.user.bot).size}`)
        .addField('Boosts',  guild.premiumSubscriptionCount.toString(), true )
        .addField('Boost Level',  guild.premiumTier, true)
        .addField('Created', guild.createdAt.toLocaleString())
        .addField('Roles', rolemap)
        .setTimestamp()
        .setThumbnail(thumbnail)
        .setFooter({ text: `Called By: ${message.author.tag}`})
        message.channel.send({ embeds: [embed] });
        }
}