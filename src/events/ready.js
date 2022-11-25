const client = require('../index');
const guild = require('../schemas/guild-schema');

client.on('ready', () => {
	console.log('Clarence is online');

	setInterval(() => {
		let serverTotal = 0;

		client.guilds.cache.forEach(() => {
			serverTotal = serverTotal + 1;
		});

		const Activities = [`${serverTotal} servers`, 'Slash Commands'];

		client.user.setActivity(
			Activities[Math.floor(Math.random() * Activities.length)],
			{ type: 'WATCHING' }
		);
	}, 180000);

	setInterval(() => {
		guild.find().then((data) => {
			if (!data) return;

			data.forEach((record) => {
				if (record.membercountChannelId == null) return;

				const memberCount = client.guilds.cache.get(record.id).memberCount;
				const channel = client.channels.cache.get(record.membercountChannelId);
				channel.setName(`Discord Members: ${memberCount.toLocaleString()}`);
				console.log(`[MEMBER COUNT] - Updated ${client.guilds.cache.get(record.id).name} member count to ${memberCount}`)
			});
		});
	}, 600000);}
);
