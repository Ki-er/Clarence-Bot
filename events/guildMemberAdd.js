const client = require("../index");

client.on('guildMemberAdd', async guildmember =>{
    const welcomechannel = client.channels.cache.get('549373904603578369')
    const guild = client.guilds.cache.get('744586833135927366');

    if(guild == guildmember.guild.id )
    {
        let welcomerole = guildmember.guild.roles.cache.find(role => role.name === 'Member');
        welcomechannel.send({ content: `<:hi:858281121611513897> Welcome! **${guildmember.user}** has just joined the server!, Grab some roles from <#744595661495861379>`});
    
    } 

})