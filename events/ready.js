const client = require("../index");
const levels = require('../events/levels')


client.on('ready', () => {
    console.log('Clarence is online')
    let activities = [`-help`, `the innercube server` ],i = 0; setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, {type:"WATCHING"}), 120000)
    levels(client)


    const guild = client.guilds.cache.get('744586833135927366');
    setInterval(() =>{
        const memberCount = guild.members.cache.filter(m => !m.user.bot).size;
        const channel = guild.channels.cache.get('857995452052799538');
        channel.setName(`Humans: ${memberCount.toLocaleString()}`);
    }, 600000);

   })
