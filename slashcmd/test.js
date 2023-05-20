const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Revisa si el sistema de SlashCommands esta funcionando correctamente."),
    async run(client, interaction){
        interaction.reply({ content: `Todo esta funcionando correctamente, <@${interaction.user.id}>.` });

    }
}