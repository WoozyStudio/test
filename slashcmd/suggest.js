const { SlashCommandBuilder } = require("@discordjs/builders");
const Discord = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("suggest")
    .setDescription("Has una sugerencia al servidor para que el staff la evalue.")
    .addStringOption(suggestion => suggestion.setName("suggest").setDescription("Escribe tu sugerencia aquí!").setRequired(true)),
    async run(client, interaction){
        const suggestion = interaction.options.getString("suggest")

        const MessageSuggestion = new Discord.MessageEmbed()
        .setAuthor({ iconURL: `${interaction.user.displayAvatarURL({ dynamic: true, size: 2048 })}`, name: `${interaction.user.tag}` })
        .addFields([
            { 
                name: "Sugerencia",
                value: `${suggestion}`
            }
        ])
        .setColor("YELLOW")
        .setTimestamp()

        const MessageSuggestionResult = await client.channels.cache.get("1109519202764718111").send({ embeds: [MessageSuggestion] })
        MessageSuggestionResult.react('👍');
        MessageSuggestionResult.react('👎');
        interaction.reply({ content: `Tu sugerencia ha sido enviada al staff... Espera la respuesta.`, ephemeral: true })
    }
}