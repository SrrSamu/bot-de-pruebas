const fs = require('fs');
const Discord = require('discord.js');
const { clientId } = require('./slashconfig.json');
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')

const commands = []

fs.readdirSync('./slashcmd').forEach(async(categorys) => {
  const slashcmdsFiles = fs.readdirSync(`./slashcmd/${categorys}`).filter((file) => file.endsWith(".js"))

  for(const file of slashcmdsFiles){
    const slash = require(`./slashcmd/${categorys}/${file}`)
    commands.push(slash.data.toJSON())
  }
})

const rest = new REST({ version: '9' }).setToken(`${process.env["Token"]}`)

createSlash()

async function createSlash() {
    try{
      await rest.put(
        Routes.applicationCommands(clientId), {
          body: commands
        }
      )
      console.log("[══════ SlashCMD ═══════]")
    } catch (e) {
      console.log(e)
    }
}
