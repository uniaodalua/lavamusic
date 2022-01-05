const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "clearqueue",
    aliases: ["cq"],
    category: "Music",
  	description: "Limpar fila",
	  args: false,
    usage: "<Número de músicas na fila>",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
	 execute: async (message, args, client, prefix) => {
  
		const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("Não há música tocando.");
            return message.reply({embeds: [thing]});
        }

		player.queue.clear();

		const emojieject = message.client.emoji.remove;

		let thing = new MessageEmbed()
			.setColor(message.client.embedColor)
			.setTimestamp()
			.setDescription(`${emojieject} Todas as músicas foram removidas da fila`)
			  return message.reply({embeds: [thing]});
    }
};
