const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Muestra el ping del bot"),

  async run(client, interaction){

    interaction.reply({ content: `Pong 🏓`,  ephemeral: true })

    
    interaction.channel.send({ content: `Mi ping es de **${client.ws.ping} ms**` })
  }
}
