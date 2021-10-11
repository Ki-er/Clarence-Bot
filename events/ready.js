const client = require("../index");
const levels = require('../events/levels')


client.on('ready', () => {
    console.log('Clarence is Online');
    client.user.setActivity('-help', {type: 'WATCHING'});
    const announceChannel = client.channels.cache.get('845386604067029054')
    announceChannel.send("Clarence is online")
    levels(client)


    const guild = client.guilds.cache.get('744586833135927366');
    setInterval(() =>{
        const memberCount = guild.members.cache.filter(m => !m.user.bot).size;
        const channel = guild.channels.cache.get('857995452052799538');
        channel.setName(`Humans: ${memberCount.toLocaleString()}`);
    }, 600000);

   })
