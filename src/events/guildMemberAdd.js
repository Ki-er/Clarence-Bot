const { MessageAttachment } = require('discord.js');
const Canvas = require('canvas');
const client = require('../index');
const guildSchema = require('../schemas/guild-schema');

client.on('guildMemberAdd', async (guildmember) => {
	const data = await guildSchema.findById(guildmember.guild.id);
	if (!data) return;
	const welcomechannel = guildmember.guild.channels.cache.get(
		data.welcomeChannelId
	);

	const welcomeCanvas = {};
	welcomeCanvas.create = Canvas.createCanvas(1024, 500);
	welcomeCanvas.context = welcomeCanvas.create.getContext('2d');
	await Canvas.loadImage('src/images/bg.jpg').then(async (img) => {
		welcomeCanvas.context.drawImage(img, 0, 0, 1024, 500);
		welcomeCanvas.context.beginPath();
		welcomeCanvas.context.arc(512, 166, 128, 0, Math.PI * 2, true);
		welcomeCanvas.context.stroke();
		welcomeCanvas.context.fill();
	});
	welcomeCanvas.context.font = '72px sans-serif';
	welcomeCanvas.context.fillStyle = '#ffffff';

	const canvas = welcomeCanvas;
	// eslint-disable-next-line no-unused-expressions, no-sequences
	(canvas.context.font = '42px sans-serif'),
		(canvas.context.textAlign = 'center');
	canvas.context.fillText(guildmember.user.tag.toUpperCase(), 512, 410);
	canvas.context.font = '32px sans-serif';
	canvas.context.fillText(
		`You are member: ${guildmember.guild.memberCount}`,
		512,
		455
	);
	canvas.context.beginPath();
	canvas.context.arc(512, 166, 119, 0, Math.PI * 2, true);
	canvas.context.closePath();
	canvas.context.clip();

	await Canvas.loadImage(
		guildmember.user.displayAvatarURL({ format: 'png', size: 1024 })
	).then((img) => {
		canvas.context.drawImage(img, 393, 47, 238, 238);
	});

	const attachment = new MessageAttachment(
		canvas.create.toBuffer(),
		`welcome-${guildmember.id}.png`
	);
	welcomechannel.send({
		content: `<:hi:858281121611513897> Welcome! **${guildmember.user}** has just joined the server!`,
		files: [attachment],
	});
});
