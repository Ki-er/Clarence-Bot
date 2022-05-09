const discord = require("discord.js");

module.exports = {
    name: "help",
    aliases: [''],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        if(!args[0]){
            const embed = new discord.MessageEmbed()
            .setTitle("Clarence Help")
            .setDescription("You can use `-help <category>` to get additional commands within a specfic category")
            .setColor('ORANGE')
    
            .addField('❓`-help`','This Command', true)
            .addField('🎉`-help admin`','Displays Admin Commands!', true)
            .addField('`-help general`', 'Displays General Commands', true)
            .addField('ℹ`-help info`', 'Displays Information Commands', true)
            .addField('🎉`-help fun`','Fun Commands!', true)
            .addField('🔫`-help siege`', 'Displays Siege Commands', true)
            message.channel.send({ embeds: [embed] });
        }
    
        if(args[0] === 'admin'){
            const embed = new discord.MessageEmbed()
            .setTitle("Admin Commands")
            .setColor('ORANGE')
            
            .addField('-ban','Bans a user from the server')
            .addField('-clear', 'Clears x ammount of messages')
            .addField('-kick', 'Kicks a user from the server')
            .addField('-mute', 'Mutes a user')    
            message.channel.send({ embeds: [embed] });
        }
    
        if(args[0] === 'fun'){
            const embed = new discord.MessageEmbed()
            .setTitle("Fun Commands")
            .setColor('ORANGE')

            .addField('-8ball', 'Answer your darkest questions')
            .addField('-bonk','Go to horny jail!')
            .addField('-cookie','Give a cookie to someone')
            .addField('-icarly', 'The lyrics of the greatest song ever')
            .addField('-mega', 'A mega pint?')
            .addField('-bong', 'Hit up some friends and hit a bong')


            //.addField('-ah', 'ah')
            //.addField('-image', 'Search Google Images For An Image')
            //.addField('-flip', 'Flip a coin')
    
            message.channel.send({ embeds: [embed] });
        }
    
    
        if(args[0] === 'siege'){
            const embed = new discord.MessageEmbed()
            .setTitle("Siege Commands")
            .setColor('ORANGE')

            .addField('-limb', 'Displays limb damage per operator')
            .addField('-muzzle','Displays muzzle attachments For all weapons')
            .addField('-help','A link to buy siege for cheap')
            message.channel.send({ embeds: [embed] });
        }
    
    
        if(args[0] === 'general'){
            const embed = new discord.MessageEmbed()
            .setTitle("General Comamnds")
            .setColor('ORANGE')

            .addField('-addemoji', 'Adds emoji to the server')
            .addField('-jumbo', 'Enalrges an emoji')
            .addField('-avatar', 'Gets a users avatar')            
            .addField('-translate', 'Translates messages to english')

            message.channel.send({ embeds: [embed] });
        }

        if(args[0] === 'info'){
            const embed = new discord.MessageEmbed()
            .setTitle("Information Commands")
            .setColor('ORANGE')

            .addField('-ping','Displays the ping')
            .addField('-channelinfo', 'Dispalys information about a certain channel')
            .addField('-userinfo', 'Dispalys information about a certain user')

            message.channel.send({ embeds: [embed] });
        }

    }
}



