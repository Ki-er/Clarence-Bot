const client = require("../index");
const levels = require('../events/levels')
var ping = require('ping');



client.on('ready', () => {
    console.log('Clarence is online')
    client.user.setActivity(`-help`, {type:"WATCHING"})
    levels(client)


    const guild = client.guilds.cache.get('744586833135927366');
    setInterval(() =>{
        const memberCount = guild.members.cache.filter(m => !m.user.bot).size;
        const channel = guild.channels.cache.get('857995452052799538');
        channel.setName(`Humans: ${memberCount.toLocaleString()}`);
    }, 600000);


    setInterval(() =>{
        var hosts = ['http://localhost:3001/api/push/i0fhZEezYb?status=true&msg=OK&ping='];
        hosts.forEach(function(host){
            ping.sys.probe(host, function(isAlive){
                var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
            });
        });  
     }, 6000);


})
