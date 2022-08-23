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
            .setTitle("HullCSS Help")
            .setDescription("You can use `!help <category>` to get additional commands within a specific category")
            .setColor('GREEN')
    
            .addField('❓`!help`','This Command', true)
            .addField('🛠️`!help admin`','Displays Admin Commands!', true)
            .addField('ℹ️ `!help general`', 'Displays General Commands!', true)
            .addField('🎉`!help fun`', 'Displays Fun Commands!', true)
            .addField('🐹 `!help gorb`', 'Displays Gorb Commands', true)
            message.channel.send({ embeds: [embed] });
        }
    
        if(args[0] === 'admin'){
            const embed = new discord.MessageEmbed()
            .setTitle("Admin Commands")
            .setColor('GREEN')


            message.channel.send({ embeds: [embed] });
        }
    

    
        if(args[0] === 'general'){
            const embed = new discord.MessageEmbed()
            .setTitle("General Commands")
            .setColor('GREEN')

            .addField('!buy', 'Sends a link to purchase membership')
            .addField('!links', 'Get all the links')
            .addField('!freeside', 'A link to the Freeside discord server')
            .addField('!robsoc', 'A link to the Robotics Society discord server')

            message.channel.send({ embeds: [embed] });
        }
        
        if(args[0] === 'fun'){
            const embed = new discord.MessageEmbed()
            .setTitle("Fun Commands")
            .setColor('GREEN')

            .addField('!8ball', 'Answer your deepest questions.')
            .addField('!gorb', 'guinea pig orb')
            .addField('!torch', 'Light the way')
            message.channel.send({ embeds: [embed] });
        }

        
        if(args[0] === 'gorb'){
            const embed = new discord.MessageEmbed()
            .setTitle("Gorb Commands")
            .setColor('GREEN')
            .addField('!gorb cs', 'CS Gorb')
            .addField('!gorb party', 'Party Gorb')
            .addField('!gorb christmas', 'Christmas Gorb')
            .addField('!gorb storm', 'Storm Gorb')

            message.channel.send({ embeds: [embed] });
        }

        
    }
}



