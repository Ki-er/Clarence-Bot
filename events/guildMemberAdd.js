const { Permissions } = require('discord.js');
const client = require("../index");
const discord = require('discord.js');
const Canvas = require('canvas')


client.on('guildMemberAdd', async guildmember =>{
    const guild = client.guilds.cache.get('744586833135927366');

    if(guild == guildmember.guild.id )
    {
        let welcomerole = guildmember.guild.roles.cache.find(role => role.name === 'Member');

        var welcomeCanvas = {};
        welcomeCanvas.create = Canvas.createCanvas(1024, 500)
        welcomeCanvas.context = welcomeCanvas.create.getContext('2d')
        await Canvas.loadImage("./images/bg.jpg").then(async (img) => {
            welcomeCanvas.context.drawImage(img, 0, 0, 1024, 500)
            welcomeCanvas.context.beginPath();
            welcomeCanvas.context.arc(512, 166, 128, 0, Math.PI * 2, true);
            welcomeCanvas.context.stroke()
            welcomeCanvas.context.fill()
        })
        welcomeCanvas.context.font = '72px sans-serif';
        welcomeCanvas.context.fillStyle = '#ffffff';
    
        const welcomechannel = client.channels.cache.get('744594748815310930')
        let canvas = welcomeCanvas;
        canvas.context.font = '42px sans-serif',
        canvas.context.textAlign = 'center';
        canvas.context.fillText(guildmember.user.tag.toUpperCase(), 512, 410)
        canvas.context.font = '32px sans-serif'
        canvas.context.fillText(`You are the ${guildmember.guild.memberCount}th member`, 512, 455)
        canvas.context.beginPath()
        canvas.context.arc(512, 166, 119, 0, Math.PI * 2, true)
        canvas.context.closePath()
        canvas.context.clip()
        await Canvas.loadImage(guildmember.user.displayAvatarURL({format: 'png', size: 1024}))
        .then(img => {
            canvas.context.drawImage(img, 393, 47, 238, 238);
        })
        let welcomeatta = new discord.MessageAttachment(canvas.create.toBuffer(), `welcome-${guildmember.id}.png`)
        welcomechannel.send({ content: `<:hi:858281121611513897> Welcome! **${guildmember.user}** has just joined the server!!`, files: [welcomeatta] });
    
    } 

})