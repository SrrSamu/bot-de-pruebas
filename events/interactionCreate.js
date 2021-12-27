module.exports = {
    name: "interactionCreate",
    async run(client, interaction){

        if(interaction.isCommand() || interaction.isContextMenu()){
            const slashcmds = client.slashcommands.get(interaction.commandName)
            if(!slashcmds) return;
            try {
              await slashcmds.run(client, interaction)
            } catch(e) {
              console.error(e)
            }
            }

    }
}
