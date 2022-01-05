const { MessageEmbed } = require("discord.js");

module.exports = {
  	name: "skipto",
	  aliases: ["jump"],
  	category: "Music",
  	description: "Avançar música",
  	args: true,
    usage: "<Número de músicas na fila>",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: true,
    sameVoiceChannel: true,
 execute: async (message, args, client, prefix) => {
  
		const player = client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("Não há música tocando.");
            return message.reply({embeds: [thing]});
        }

        const position = Number(args[0]);
		
		if (!position || position < 0 || position > player.queue.size) { 
			let thing = new MessageEmbed()
                .setColor("RED")
				.setDescription(`Usage: ${message.client.prefix}pular para <Número de músicas na fila>`)
            return message.reply({embeds: [thing]});
		}

        player.queue.remove(0, position - 1);
        player.stop();
		
		const emojijump = client.emoji.jump;

		let thing = new MessageEmbed()
			.setDescription(`${emojijump} Avançar **${position}** musica`)
			.setColor(client.embedColor)
			.setTimestamp()
			
		return message.reply({embeds: [thing]});
	
    }
};
