const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()

  .setName("continue")

  .setDescription("Para continuar la cancion que esta pausada"),

  async run(client, interaction){

    if(!interaction.member.voice.channel) return interaction.reply({ content: `Debes estar en un canal de voz` })
    if(interaction.guild.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id) return interaction.reply({ content: `Debes estar en el mismo canal de voz que yo` })

    let queue = client.distube.getQueue(interaction.member.voice.channel)
    if(!queue) return interaction.reply({ content: `No se estan reproduciendo canciones`,  ephemeral: true })


    try {
      await client.distube.resume(interaction.member.voice.channel)
      interaction.reply({ content: `La cancion ha sido resumida correctamente`})
    } catch(err) {
      console.log(err)
      interaction.reply({ content: `Ha surgido un error inesperado`})
    }

  }
}
