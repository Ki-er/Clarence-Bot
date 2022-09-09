const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'channelinfo',
	description: 'Shows information About mentioned Channel',

	async run(client, message, args) {
		const channel =
			message.mentions.channels.first() ||
			client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
			message.guild.channels.cache.find(
				(r) => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase()
			) ||
			message.channel;
		if (!channel) return message.channel.send('**Channel Not Found!**');

		const embed = new MessageEmbed()
			.setTitle(`Channel Information for ${channel.name}`)
			.setThumbnail(message.guild.iconURL())
			.addField('**NSFW**', `${channel.nsfw}`)
			.addField('**Channel ID**', `${channel.id}`)
			.addField('**Channel Type**', `${channel.type}`)
			.addField(
				'**Channel Description**',
				`${channel.topic || 'No Description'}`
			)
			.addField('**Channel Created At**', `${channel.createdAt}`)
			.setColor('ORANGE')
			.setFooter({ text: `Called By: ${message.author.tag}` })
			.setTimestamp();
		message.channel.send({ embeds: [embed] });
	},
};
