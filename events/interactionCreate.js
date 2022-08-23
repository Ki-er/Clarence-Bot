const client = require("../index");
const discord = require("discord.js")

client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.reply({ content: "An error has occured " });

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
    
    // Button Handling
    if (interaction.isButton()) {
            if(interaction.customId == "codeOfConduct"){
                if(interaction.member.roles.cache.has("973646380771979304"))
                {
                    interaction.reply({ content: 'You already have agreed to the code of conduct!', ephemeral: true})
                } 
                else
                {
                    interaction.member.roles.add("973646380771979304")
                    await interaction.reply({ content: 'Thank you for agreeing to the code of conduct!\r\nYou can now access the rest of the server!', ephemeral: true});
                }
            }


            

            if(interaction.customId == "paidModal")
            {
                if(interaction.member.roles.cache.has(`427878753008353292`))
                {
                    await interaction.deferReply({ ephemeral: true })
                    interaction.followUp({ content: 'You already have the paid member role.', ephemeral: true })

                } 
                else{
                    const modal = new discord.Modal()
                        .setCustomId('modal-paidmember')
                        .setTitle('Paid Member Discord Access')
                    const studentname = new discord.TextInputComponent()                        
                        .setLabel("Student Name")
                        .setStyle("SHORT")
                        .setCustomId("studentname")
                    const studentnumber = new discord.TextInputComponent()                        
                        .setLabel("Student Number")
                        .setStyle("SHORT")
                        .setCustomId("studentnumber")
                    const firstActionRow = new discord.MessageActionRow().addComponents(studentname);
                    const secondActionRow = new discord.MessageActionRow().addComponents(studentnumber);   
                    modal.addComponents(firstActionRow, secondActionRow);
                    await interaction.showModal(modal);   

                    }
            }

            if(interaction.customId == "deletemessage")
            {
                await interaction.message.delete();
                await interaction.reply({ content: 'Message has been deleted', ephemeral: true});
            }

            if(interaction.isButton)
            {
                if(interaction.customId == "CloseThread")
                {
                    interaction.reply(`This channel has been archived, you can unarchive this thread by sending another message.`) 
                    interaction.channel.setArchived(true)
                }
            }
    }

    // Select Menu Handling
    if(interaction.isSelectMenu()) {
        if(interaction.customId == "yearSelect")
        {
            if(interaction.values.includes("0"))
            {
                interaction.member.roles.add("974754114296741948") // Add Foundation
                interaction.member.roles.remove("441276956089122836") // Remove First Year
                interaction.member.roles.remove("441276979514441741") // Remove Second Year
                interaction.member.roles.remove("441277048003100684") // Remove Year In Industry Year
                interaction.member.roles.remove("441277001744121856") // Remove Third Year
                interaction.member.roles.remove("441277023873138743") // Remove Masters Year
                interaction.member.roles.remove("460435898660683778") // Remove PhD Year
                interaction.member.roles.remove("441277481488613386") // Remove Graduate Year
            }
            else if(interaction.values.includes("1"))
            {
                interaction.member.roles.add("441276956089122836") // Add First Year
                interaction.member.roles.remove("974754114296741948") // Remove Foundation Year
                interaction.member.roles.remove("441276979514441741") // Remove Second Year
                interaction.member.roles.remove("441277048003100684") // Remove Year In Industry Year
                interaction.member.roles.remove("441277001744121856") // Remove Third Year
                interaction.member.roles.remove("441277023873138743") // Remove Masters Year
                interaction.member.roles.remove("460435898660683778") // Remove PhD Year
                interaction.member.roles.remove("441277481488613386") // Remove Graduate Year
            }
            else if(interaction.values.includes("2"))
            {
                interaction.member.roles.add("441276979514441741") // Add Second Year
                interaction.member.roles.remove("974754114296741948") // Remove Foundation Year
                interaction.member.roles.remove("441276956089122836") // Remove First Year
                interaction.member.roles.remove("441277048003100684") // Remove Year In Industry Year
                interaction.member.roles.remove("441277001744121856") // Remove Third Year
                interaction.member.roles.remove("441277023873138743") // Remove Masters Year
                interaction.member.roles.remove("460435898660683778") // Remove PhD Year
                interaction.member.roles.remove("441277481488613386") // Remove Graduate Year
            }
            else if(interaction.values.includes("3"))
            {
                interaction.member.roles.add("441277048003100684") // Add Year In Industry Year
                interaction.member.roles.remove("974754114296741948") // Remove Foundation Year
                interaction.member.roles.remove("441276956089122836") // Remove First Year
                interaction.member.roles.remove("441276979514441741") // Remove Second Year
                interaction.member.roles.remove("441277001744121856") // Remove Third Year
                interaction.member.roles.remove("441277023873138743") // Remove Masters Year
                interaction.member.roles.remove("460435898660683778") // Remove PhD Year
                interaction.member.roles.remove("441277481488613386") // Remove Graduate Year
            }
            else if(interaction.values.includes("4"))
            {
                interaction.member.roles.add("441277001744121856") // Add Third Year
                interaction.member.roles.remove("974754114296741948") // Remove Foundation Year
                interaction.member.roles.remove("441276956089122836") // Remove First Year
                interaction.member.roles.remove("441276979514441741") // Remove Second Year
                interaction.member.roles.remove("441277048003100684") // Remove Year In Industry Year
                interaction.member.roles.remove("441277023873138743") // Remove Masters Year
                interaction.member.roles.remove("460435898660683778") // Remove PhD Year
                interaction.member.roles.remove("441277481488613386") // Remove Graduate Year
            }
            else if(interaction.values.includes("5"))
            {
                interaction.member.roles.add("441277023873138743") // Add Masters Year
                interaction.member.roles.remove("974754114296741948") // Remove Foundation Year
                interaction.member.roles.remove("441276956089122836") // Remove First Year
                interaction.member.roles.remove("441276979514441741") // Remove Second Year
                interaction.member.roles.remove("441277048003100684") // Remove Year In Industry Year
                interaction.member.roles.remove("441277001744121856") // Remove Third Year
                interaction.member.roles.remove("460435898660683778") // Remove PhD Year
                interaction.member.roles.remove("441277481488613386") // Remove Graduate Year
            }
            else if(interaction.values.includes("6"))
            {
                interaction.member.roles.add("460435898660683778") // Add PhD Year
                interaction.member.roles.remove("974754114296741948") // Remove Foundation Year
                interaction.member.roles.remove("441276956089122836") // Remove First Year
                interaction.member.roles.remove("441276979514441741") // Remove Second Year
                interaction.member.roles.remove("441277048003100684") // Remove Year In Industry Year
                interaction.member.roles.remove("441277001744121856") // Remove Third Year
                interaction.member.roles.remove("441277023873138743") // Remove Masters Year
                interaction.member.roles.remove("441277481488613386") // Remove Graduate Year
            }
            else if(interaction.values.includes("7"))
            {
                interaction.member.roles.add("441277481488613386") // Add Graduate Year
                interaction.member.roles.remove("974754114296741948") // Remove Foundation Year
                interaction.member.roles.remove("441276956089122836") // Remove First Year
                interaction.member.roles.remove("441276979514441741") // Remove Second Year
                interaction.member.roles.remove("441277048003100684") // Remove Year In Industry Year
                interaction.member.roles.remove("441277001744121856") // Remove Third Year
                interaction.member.roles.remove("441277023873138743") // Remove Masters Year
                interaction.member.roles.remove("460435898660683778") // Remove PhD Year
            }
            await interaction.reply({ content: 'Roles have been updated', ephemeral: true});
        }


        if(interaction.customId == "pronounSelect")
        {
            if(interaction.values.includes("HeHim"))
            { interaction.member.roles.add("851148987271479385")}
            else{interaction.member.roles.remove("851148987271479385")}

            if(interaction.values.includes("HeThey"))
            { interaction.member.roles.add("974762127762010162")} 
            else{interaction.member.roles.remove("974762127762010162")}

                if(interaction.values.includes("SheHer"))
            { interaction.member.roles.add("851149045241085963")}
            else{interaction.member.roles.remove("851149045241085963")}
                    
            if(interaction.values.includes("SheThey"))
            { interaction.member.roles.add("974762040969273404")}
            else{interaction.member.roles.remove("974762040969273404")}

            if(interaction.values.includes("TheyThem"))
            { interaction.member.roles.add("851149362582913074")} 
            else{interaction.member.roles.remove("851149362582913074")}

            if(interaction.values.includes("Any"))
            { interaction.member.roles.add("851149407050137631")} 
            else{interaction.member.roles.remove("851149407050137631")}

            if(interaction.values.includes("Ask"))
            { interaction.member.roles.add("851149443738107934")} 
            else{interaction.member.roles.remove("851149443738107934")}

            await interaction.reply({ content: 'Roles have been updated', ephemeral: true});
        }

                
        if(interaction.customId == "bcsSelect")
        {
            if(interaction.values.includes("bscStudent"))
            { 
                interaction.member.roles.add("891422426133581895") // Add BCS Student
                interaction.member.roles.remove("891422508555829288") // Remove Associate
                interaction.member.roles.remove("891422669575184436") // Remove Prof
                interaction.member.roles.remove("891422900182204487") // Remove Fellow
            }
            else if(interaction.values.includes("bcsAss"))
            { 
                interaction.member.roles.add("891422508555829288") // Add BCS Associate
                interaction.member.roles.remove("891422426133581895") // Remove Student
                interaction.member.roles.remove("891422669575184436") // Remove Prof
                interaction.member.roles.remove("891422900182204487") // Remove Fellow
            }
            else if(interaction.values.includes("bcsProff"))
            { 
                interaction.member.roles.add("891422669575184436") // Add Prof
                interaction.member.roles.remove("891422426133581895") // Remove Student
                interaction.member.roles.remove("891422508555829288") // Remove Associate
                interaction.member.roles.remove("891422900182204487") // Remove Fellow
            }
            else if(interaction.values.includes("bcsFellow"))
            { 
                interaction.member.roles.add("891422900182204487") // Add Fellow
                interaction.member.roles.remove("891422426133581895") // Remove Student
                interaction.member.roles.remove("891422508555829288") // Remove Associate
                interaction.member.roles.remove("891422669575184436") // Remove Prof
            }
            await interaction.reply({ content: 'Roles have been updated', ephemeral: true});
        }

        if(interaction.customId == "miscSelect")
        {
            if(interaction.values.includes("courserep"))
            { interaction.member.roles.add("493738161713709077")} 
            else{interaction.member.roles.remove("493738161713709077")}

            if(interaction.values.includes("ACWPing"))
            { interaction.member.roles.add("904354161561309184")} 
            else{interaction.member.roles.remove("904354161561309184")}
            
            await interaction.reply({ content: 'Roles have been updated', ephemeral: true});
        }
    }

    // Modal Handling
    if(interaction.isModalSubmit) {
        if(interaction.customId === 'modal-paidmember'){
            const execchannel = client.channels.cache.get('981678376655921153')
    
            const embed = new discord.MessageEmbed()
                .setTitle("New Paid Member Request")
                .setColor('GREEN')
                .addField('Discord Tag', `${ interaction.user} <- Click to add role.`)
                .addField('Discord Discriminator', `${interaction.user.tag}`)
                .addField('Student Name', `${ interaction.fields.getTextInputValue("studentname")}`)
                .addField('Student Number',`${ interaction.fields.getTextInputValue("studentnumber")}`)
                .setDescription('https://hulluniunion.com/')
            const row = new discord.MessageActionRow()
            .addComponents(
                new discord.MessageButton()
                    .setCustomId('deletemessage')
                    .setEmoji('')
                    .setLabel('Delete Message')
                    .setStyle('DANGER')
            )
            execchannel.send({embeds: [embed], components: [row] });
            await interaction.deferReply({ ephemeral: true })
            interaction.followUp({ content: 'Your request has been sent to execs!', ephemeral: true })
    
        }  
    }
    

});