const client = require('../index');
const { MessageEmbed } = require('discord.js');

client.on('guildCreate', (g) => {
	const channel = g.channels.cache.find(
		(channel) =>
			channel.type === 'GUILD_TEXT' &&
			channel.permissionsFor(g.me).has('SEND_MESSAGES')
	);

	const embed = new MessageEmbed()
		.setTitle('Thanks for inviting me!')
		.setDescription(
			'I am Clarence, a multipurpose bot with fun, information and unique commands!'
		)
		.setColor('ORANGE')
		.addField(
			'Get Started',
			'To get started run `/config`to configure your welcome and suggestion commands!'
		)
		.addField(
			'Invite',
			'You can invite me [here](https://discord.com/api/oauth2/authorize?client_id=875491402497294447&permissions=8&scope=bot)'
		)
		.setFooter({ text: 'Created By Kieran#891' });

	channel.send({ embeds: [embed] });
});
