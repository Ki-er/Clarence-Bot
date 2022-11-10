const client = require('../index');
const guild = require('../schemas/guild-schema');

client.on('ready', () => {
	console.log('Clarence is online');

	client.guilds.cache.forEach((guild) => {
		let serverTotal = serverTotal + 1
	});

	client.user.setActivity(`Slash Commands`, { type: 'WATCHING' });

	setInterval(() => {
		guild.find().then((data) => {
			if (!data) return;

			data.forEach((record) => {
				const guild = client.guilds.cache.get(record.id);

				if (record.membercountChannelId == null) return;

				const channel = client.channels.cache.get(record.membercountChannelId);
				const memberCount = guild.memberCount;
				channel.setName(`Discord Members: ${memberCount.toLocaleString()}`);
			});
		});
	}, 600000);
});
