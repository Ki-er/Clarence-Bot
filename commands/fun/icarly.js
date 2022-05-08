const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'icarly',
    aliases: [''],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const embed = new MessageEmbed()
        .setTitle("iCarly")
        .setColor('ORANGE')
        .setFooter(`Called By: ${message.author.tag}`)
        .setTimestamp()
        .setDescription(`
    I know, you see
    Somehow the world will change for me
    And be so wonderful
    
    Live life, breathe air
    I know somehow we're gonna get there
    And feel so wonderful
    
    I will make you change your mind
    These things happen all the time
    And it's all real
    I'm telling you just how I feel
    
    So wake up the members of my nation
    It's your time to be
    There's no chance unless you take one
    And the time to see the brighter side of every situation
    Some things are meant to be
    So give me your best and leave the rest to me
    
    I know, it's time
    To raise the hand that draws the line
    And be so wonderful
    
    Golden sunshine, I know somehow
    It's gonna be mine
    And feel so wonderful
    
    Show me what you can become
    There's a dream in everyone
    And its all real
    I'm telling you just how I feel
    
    So wake up the members of my nation
    It's your time to be
    There's no chance unless you take one
    And the time to see the brighter side of every situation
    Some things are meant to be
    So give me your best and leave the rest to me
    
    Leave it all to me
    So make it right and see it through
    You know you won't be free until you
    
    So wake up the members of my nation
    It's your time to be
    There's no chance unless you take one
    And the time to see the brighter side of every situation
    Some things are meant to be
    So give me your best and leave the rest to me
    
    Leave it all to me
    Leave it all to me
    Just leave it all to me    
        `)
    

        message.channel.send({ embeds: [embed] });
    }
}