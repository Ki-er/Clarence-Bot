const discord = require("discord.js");

module.exports = {
    name: "gorb",
    aliases: [''],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        
        if(!args[0]){
            message.channel.send({ files: ['./images/gorb.jpg'] })
        }
        if(args[0] === 'cs'){
            message.channel.send({ files: ['./images/gorbcs.jpg'] })
        }

        if(args[0] === 'party'){
            message.channel.send({ files: ['./images/gorbcelebration.PNG'] })
        }

        
        if(args[0] === 'christmas'){
            message.channel.send({ files: ['./images/gorbchristmas.PNG'] })
        }

        if(args[0] === 'storm'){
            message.channel.send({ files: ['./images/gorbstorm.PNG'] })
        }

        if(args[0] == 'large'){
            message.channel.send({ files: ['./images/gorblarge.png'] })
        }


    },
};