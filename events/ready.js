const client = require("../index");

client.on('ready', () => {
    console.log('Clarence is online')
    client.user.setActivity(`-help`, {type:"WATCHING"})

        setInterval(() =>{
            const memberCount = client.guilds.cache.get('744586833135927366').memberCount
            const channel = client.channels.cache.get('857995452052799538');
            channel.setName(`Discord Members: ${memberCount.toLocaleString()}`);
        }, 600000);

})
    
