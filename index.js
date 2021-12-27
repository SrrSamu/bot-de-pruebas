const Discord = require('discord.js')
const intents = new Discord.Intents(32767)
const client = new Discord.Client({ intents })
const fs = require('fs')
require('./slashcommands')
const path = require("path")

const { DisTube } = require('distube');
client.distube = new DisTube(client, {
  emitNewSongOnly: false
})

const events = fs.readdirSync(path.join(__dirname, 'events'));
  for (const file of events) {
    const event = require(path.join(__dirname, 'events', file));
    client.on(event.name, (... args) => event.run(client, ...args));
  }

client.slashcommands = new Discord.Collection()

fs.readdirSync('./slashcmd').forEach(async(categorys) => {
  const slashcmdsFiles = fs.readdirSync(`./slashcmd/${categorys}`).filter(file => file.endsWith(".js"))

  for (const file of slashcmdsFiles){
    const slash = require(`./slashcmd/${categorys}/${file}`)
    client.slashcommands.set(slash.data.name, slash)
  }
})

client.distube.on("playSong", async (queue, song) => {

  queue.textChannel.send(`Reproduciondo ahora. ${song.name}`)
});

client.distube.on("addSong", async (queue, song) => {

queue.textChannel.send(`Canion añadida: ${song.name}`)

});


client.login(process.env["Token"])
