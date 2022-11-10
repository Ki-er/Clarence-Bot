const client = require('../index');
const guild = require('../schemas/guild-schema');

client.on('ready', () => {
	console.log('Clarence is online');

	let serverTotal = 0
	client.guilds.cache.forEach((guild) => {
		serverTotal = serverTotal + 1
	});

	const Activities = [`${serverTotal} servers`, 'Slash Commands'];

	setInterval(() => {
		client.user.setActivity(
			Activities[Math.floor(Math.random() * Activities.length)],
			{ type: 'WATCHING' }
		);
	}, 180000);

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
