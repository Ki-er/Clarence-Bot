const client = require("../index");
const discord = require("discord.js");
const { channels } = require("../index");

client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch(() => {});

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "An error has occured " });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction, args);
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ ephemeral: false });
        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }

    if(interaction.isSelectMenu()) {
        if(interaction.customId == "help")
        {
            if(interaction.values.includes("fun"))
            {
                const embed = new discord.MessageEmbed()
                .setTitle("Fun Commands")
                .setColor('ORANGE')
                .addField('-8ball', 'Answer your darkest questions')
                .addField('-bonk','Go to horny jail!')
                .addField('-cookie','Give a cookie to someone')
                .addField('-icarly', 'The lyrics of the greatest song ever')
                .addField('-mega', 'A mega pint?')
                .addField('-bong', 'Hit up some friends and hit a bong')
                await interaction.update({ embeds: [embed], ephemeral: true});
            }
            else if(interaction.values.includes("siege"))
            {
                const embed = new discord.MessageEmbed()
                .setTitle("Siege Commands")
                .setColor('ORANGE')

                .addField('-limb', 'Displays limb damage per operator')
                .addField('-muzzle','Displays muzzle attachments For all weapons')
                .addField('-buy','A link to buy siege for cheap')
            }
            else if(interaction.values.includes("general"))
            {
                const embed = new discord.MessageEmbed()
                .setTitle("General Comamnds")
                .setColor('ORANGE')
                .addField('-jumbo', 'Enalrges an emoji')
                .addField('-avatar', 'Gets a users avatar')            
                .addField('-translate', 'Translates messages to english')
            }
            else if(interaction.values.includes("info"))
            {
                const embed = new discord.MessageEmbed()
                .setTitle("Information Commands")
                .setColor('ORANGE')

                .addField('-ping','Displays the ping')
                .addField('-channelinfo', 'Dispalys information about a certain channel')
                .addField('-userinfo', 'Dispalys information about a certain user')
            }
            else if(interaction.values.includes("admin") && (interaction.member.permissions.has(discord.Permissions.FLAGS.ADMINISTRATOR)))
            {
                const embed = new discord.MessageEmbed()
                .setTitle("Admin Commands")
                .setColor('ORANGE')
                .addField('-ban','Bans a user from the server')
                .addField('-clear', 'Clears x ammount of messages')
                .addField('-kick', 'Kicks a user from the server')
                .addField('-mute', 'Mutes a user')  
                .addField('-addemoji', 'Adds emoji to the server')
            }
            else
            {
                await interaction.update({ content: 'You do not have permission to view these commands.', ephemeral: true});
            }
        }

        if(interaction.customId == "colours")
        {
            if(interaction.values.includes("colourLB"))
            {
                interaction.member.roles.add("744601093702418583") // Add Lightblue
                interaction.member.roles.remove("744600129218150482") // aqua
                interaction.member.roles.remove("744600794556399646") //teal
                interaction.member.roles.remove("744984545916354613") //Red
                interaction.member.roles.remove("744987041074512052") // Orange
                interaction.member.roles.remove("744600128471564288") // Yellow
                interaction.member.roles.remove("744600127670452314") // Pink
                interaction.member.roles.remove("744600127645155329") // Magenta
                interaction.member.roles.remove("744600129813610536") // Green
                interaction.member.roles.remove("744985758212948058") // DG
                interaction.member.roles.remove("744600133781684255") // Silver
                interaction.member.roles.remove("744600128572358697") // Brown

            }
            else if(interaction.values.includes("colourAqua"))
            {
                interaction.member.roles.add("744600129218150482") // Add Aqua
                interaction.member.roles.remove("744601093702418583") // LB
                interaction.member.roles.remove("744600794556399646") // teal
                interaction.member.roles.remove("744984545916354613") // Red
                interaction.member.roles.remove("744987041074512052") // Orange
                interaction.member.roles.remove("744600128471564288") // Yellow
                interaction.member.roles.remove("744600127670452314") // Pink
                interaction.member.roles.remove("744600127645155329") // Magenta
                interaction.member.roles.remove("744600129813610536") // Green
                interaction.member.roles.remove("744985758212948058") // DG
                interaction.member.roles.remove("744600133781684255") // Silver
                interaction.member.roles.remove("744600128572358697") // Brown

            }
            else if(interaction.values.includes("colourTeal")) // Add teal
            {
                interaction.member.roles.add("744600794556399646")
                interaction.member.roles.remove("744601093702418583") //LB
                interaction.member.roles.remove("744600129218150482") // Aqua
                interaction.member.roles.remove("744984545916354613") // Red
                interaction.member.roles.remove("744987041074512052") // Orange
                interaction.member.roles.remove("744600128471564288") // Yellow
                interaction.member.roles.remove("744600127670452314") // Pink
                interaction.member.roles.remove("744600127645155329") // Magenta
                interaction.member.roles.remove("744600129813610536") // Green
                interaction.member.roles.remove("744985758212948058") // DG
                interaction.member.roles.remove("744600133781684255") // Silver
                interaction.member.roles.remove("744600128572358697") // Brown

            }
            else if(interaction.values.includes("colourRed"))
            {
                interaction.member.roles.add("744984545916354613")
                interaction.member.roles.remove("744601093702418583") // LB
                interaction.member.roles.remove("744600129218150482") // Aqua
                interaction.member.roles.remove("744600794556399646") // Teal
                interaction.member.roles.remove("744987041074512052") // Orange
                interaction.member.roles.remove("744600128471564288") // Yellow
                interaction.member.roles.remove("744600127670452314") // Pink
                interaction.member.roles.remove("744600127645155329") // Magenta
                interaction.member.roles.remove("744600129813610536") // Green
                interaction.member.roles.remove("744985758212948058") // DG
                interaction.member.roles.remove("744600133781684255") // Silver
                interaction.member.roles.remove("744600128572358697") // Brown
            }
            else if(interaction.values.includes("colourOrange"))
            {
                interaction.member.roles.add("744987041074512052")
                interaction.member.roles.remove("744601093702418583") // LB
                interaction.member.roles.remove("744600129218150482") // Aqua
                interaction.member.roles.remove("744600794556399646") // Teal
                interaction.member.roles.remove("744984545916354613") // Red
                interaction.member.roles.remove("744600128471564288") // Yellow
                interaction.member.roles.remove("744600127670452314") // Pink
                interaction.member.roles.remove("744600127645155329") // Magenta
                interaction.member.roles.remove("744600129813610536") // Green
                interaction.member.roles.remove("744985758212948058") // DG
                interaction.member.roles.remove("744600133781684255") // Silver
                interaction.member.roles.remove("744600128572358697") // Brown
            }
            else if(interaction.values.includes("colourYellow"))
            {
                interaction.member.roles.add("744600128471564288")
                interaction.member.roles.remove("744601093702418583") // LB
                interaction.member.roles.remove("744600129218150482") // Aqua
                interaction.member.roles.remove("744600794556399646") // Teal
                interaction.member.roles.remove("744984545916354613") // Red
                interaction.member.roles.remove("744987041074512052") // Orange
                interaction.member.roles.remove("744600127670452314") // Pink
                interaction.member.roles.remove("744600127645155329") // Magenta
                interaction.member.roles.remove("744600129813610536") // Green
                interaction.member.roles.remove("744985758212948058") // DG
                interaction.member.roles.remove("744600133781684255") // Silver
                interaction.member.roles.remove("744600128572358697") // Brown

            }
            else if(interaction.values.includes("colourPink"))
            {
                interaction.member.roles.add("744600127670452314")
                interaction.member.roles.remove("744601093702418583") // LB
                interaction.member.roles.remove("744600129218150482") // Aqua
                interaction.member.roles.remove("744600794556399646") // Teal
                interaction.member.roles.remove("744984545916354613") // Red
                interaction.member.roles.remove("744987041074512052") // Orange
                interaction.member.roles.remove("744600128471564288") // Yellow
                interaction.member.roles.remove("744600127645155329") // Magenta
                interaction.member.roles.remove("744600129813610536") // Green
                interaction.member.roles.remove("744985758212948058") // DG
                interaction.member.roles.remove("744600133781684255") // Silver
                interaction.member.roles.remove("744600128572358697") // Brown

            }
            else if(interaction.values.includes("colourMagenta"))
            {
                interaction.member.roles.add("744600127645155329")
                interaction.member.roles.remove("744601093702418583") // LB
                interaction.member.roles.remove("744600129218150482") // Aqua
                interaction.member.roles.remove("744600794556399646") // Teal
                interaction.member.roles.remove("744984545916354613") // Red
                interaction.member.roles.remove("744987041074512052") // Orange
                interaction.member.roles.remove("744600127670452314") // Pink
                interaction.member.roles.remove("744600128471564288") // Yellow
                interaction.member.roles.remove("744600129813610536") // Green
                interaction.member.roles.remove("744985758212948058") // DG
                interaction.member.roles.remove("744600133781684255") // Silver
                interaction.member.roles.remove("744600128572358697") // Brown

            }
            else if(interaction.values.includes("colourGreen"))
            {
                interaction.member.roles.add("744600129813610536")
                interaction.member.roles.remove("744601093702418583") // LB
                interaction.member.roles.remove("744600129218150482") // Aqua
                interaction.member.roles.remove("744600794556399646") // Teal
                interaction.member.roles.remove("744984545916354613") // Red
                interaction.member.roles.remove("744987041074512052") // Orange
                interaction.member.roles.remove("744600127670452314") // Pink
                interaction.member.roles.remove("744600128471564288") // Yellow
                interaction.member.roles.remove("744600127645155329") // Magenta
                interaction.member.roles.remove("744985758212948058") // DG
                interaction.member.roles.remove("744600133781684255") // Silver
                interaction.member.roles.remove("744600128572358697") // Brown

            }
            else if(interaction.values.includes("colourSilver"))
            {
                interaction.member.roles.add("744600133781684255")
                interaction.member.roles.remove("744601093702418583") // LB
                interaction.member.roles.remove("744600129218150482") // Aqua
                interaction.member.roles.remove("744600794556399646") // Teal
                interaction.member.roles.remove("744984545916354613") // Red
                interaction.member.roles.remove("744987041074512052") // Orange
                interaction.member.roles.remove("744600127670452314") // Pink
                interaction.member.roles.remove("744600128471564288") // Yellow
                interaction.member.roles.remove("744600127645155329") // Magenta
                interaction.member.roles.remove("744600129813610536") // Green
                interaction.member.roles.remove("744985758212948058") // DG
                interaction.member.roles.remove("744600128572358697") // Brown

            }
            else if(interaction.values.includes("colourDG"))
            {
                interaction.member.roles.add("744985758212948058")
                interaction.member.roles.remove("744601093702418583") // LB
                interaction.member.roles.remove("744600129218150482") // Aqua
                interaction.member.roles.remove("744600794556399646") // Teal
                interaction.member.roles.remove("744984545916354613") // Red
                interaction.member.roles.remove("744987041074512052") // Orange
                interaction.member.roles.remove("744600127670452314") // Pink
                interaction.member.roles.remove("744600128471564288") // Yellow
                interaction.member.roles.remove("744600127645155329") // Magenta
                interaction.member.roles.remove("744600129813610536") // Green
                interaction.member.roles.remove("744600133781684255") // Silver
                interaction.member.roles.remove("744985758212948058") // DG
                interaction.member.roles.remove("744600128572358697") // Brown
            }
            else if(interaction.values.includes("colourBrown"))
            {
                interaction.member.roles.add("744600128572358697")
                interaction.member.roles.remove("744601093702418583") // LB
                interaction.member.roles.remove("744600129218150482") // Aqua
                interaction.member.roles.remove("744600794556399646") // Teal
                interaction.member.roles.remove("744984545916354613") // Red
                interaction.member.roles.remove("744987041074512052") // Orange
                interaction.member.roles.remove("744600127670452314") // Pink
                interaction.member.roles.remove("744600128471564288") // Yellow
                interaction.member.roles.remove("744600127645155329") // Magenta
                interaction.member.roles.remove("744600129813610536") // Green
                interaction.member.roles.remove("744600133781684255") // Silver
                interaction.member.roles.remove("744985758212948058") // DG

            }
            await interaction.reply({ content: 'Roles have been updated', ephemeral: true});
        }
    
        if(interaction.customId == "pingables"){
            if(interaction.values.includes("smallUpdates"))  interaction.member.roles.add("877156174364020736") 
            else interaction.member.roles.remove("877156174364020736")
    
            if(interaction.values.includes("clarenceUpdates")) interaction.member.roles.add("877156320569081856") 
            else interaction.member.roles.remove("877156320569081856")
    
            if(interaction.values.includes("randomUpdates")) interaction.member.roles.add("784158568675934267") 
            else interaction.member.roles.remove("784158568675934267") 
    
            if(interaction.values.includes("allUpdates")) interaction.member.roles.add("886532503249244191") 
            else interaction.member.roles.remove("886532503249244191") 
    
            await interaction.reply({ content: 'Roles have been updated', ephemeral: true});
        }
        
        if(interaction.customId == "games"){
            if(interaction.values.includes("R6"))  interaction.member.roles.add("805540203132878869") 
            else interaction.member.roles.remove("805540203132878869")
    
            if(interaction.values.includes("gameMinecraft")) interaction.member.roles.add("856086822030802944") 
            else interaction.member.roles.remove("856086822030802944")
    
            await interaction.reply({ content: 'Roles have been updated', ephemeral: true});
        }
    
        if(interaction.customId == "pronouns"){
            if(interaction.values.includes("He"))  interaction.member.roles.add("881435375816540172") 
            else interaction.member.roles.remove("881435375816540172")
    
            if(interaction.values.includes("She")) interaction.member.roles.add("881435424977985546") 
            else interaction.member.roles.remove("881435424977985546")
            
            if(interaction.values.includes("They")) interaction.member.roles.add("881435451448246272") 
            else interaction.member.roles.remove("881435451448246272")
    
            if(interaction.values.includes("Any")) interaction.member.roles.add("881435646487564329") 
            else interaction.member.roles.remove("881435646487564329")
    
            if(interaction.values.includes("Ask")) interaction.member.roles.add("881435656503574540") 
            else interaction.member.roles.remove("881435656503574540")
    
            await interaction.reply({ content: 'Roles have been updated', ephemeral: true});
        }
    
        if(interaction.customId == "age"){
            if(interaction.values.includes("13"))  interaction.member.roles.add("881438022116212767") 
            else interaction.member.roles.remove("881438022116212767")
    
            if(interaction.values.includes("17")) interaction.member.roles.add("881438516339412992") 
            else interaction.member.roles.remove("881438516339412992")
            
            if(interaction.values.includes("21")) interaction.member.roles.add("881438520063959040") 
            else interaction.member.roles.remove("881438520063959040")
    
            if(interaction.values.includes("25")) interaction.member.roles.add("881438522794446848") 
            else interaction.member.roles.remove("881438522794446848")
    
            if(interaction.values.includes("28")) interaction.member.roles.add("881438525021634560") 
            else interaction.member.roles.remove("881438525021634560")
    
            if(interaction.values.includes("30")) interaction.member.roles.add("881438528364511252") 
            else interaction.member.roles.remove("881438528364511252")
    
            await interaction.reply({ content: 'Roles have been updated', ephemeral: true});
        }
    }


});
