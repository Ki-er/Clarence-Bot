const client = require('../index');

client.on('ready', () => {
	console.log('Clarence is online');
	client.user.setActivity(`Slash Commands`, { type: 'WATCHING' });
});
