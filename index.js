const http = require("http");
const test = http.createServer((_, res) => res.end("Conectado al server correctamente")).listen(8080)
console.log(test.address())
const Discord = require("discord.js");
const config = require("./config/config.json");
const fs = require("fs");
require('colors')

const client = new Discord.Client({ intents: 32767 })

client.on('ready', async () => {
  console.log(`Logged as ${client.user.tag}`.green)
    client.user.setActivity("Utilities & Ideas", {
      type: 'STREAMING',
      url: "https://www.twitch.tv/woozysyt"
    })
  })
client.setMaxListeners(200)

client.slashcommands = new Discord.Collection();
const slashcommandsFiles = fs.readdirSync("./slashcmd").filter(file => file.endsWith(".js"))

for (const file of slashcommandsFiles) {
  const slash = require(`./slashcmd/${file}`)
  console.log(`Slash commands - ${file} loaded.`)
  client.slashcommands.set(slash.data.name, slash)
}

//Commands and Interactions
client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    const slashcmds = client.slashcommands.get(interaction.commandName)

    if (!slashcmds) return;

    try {
      await slashcmds.run(client, interaction)
    } catch (e) {
      console.error(e)
    }
  }

  
})

client.login(config.token)