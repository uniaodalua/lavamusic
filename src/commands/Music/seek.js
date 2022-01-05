const { MessageEmbed } = require("discord.js");
const { convertTime } = require('../../utils/convert.js')
const ms = require('ms');

module.exports = {
  	name: "seek",
  	aliases: [],
  	category: "Music",
  	description: "Procure a música que está tocando no momento",
  	args: true,
    usage: "<10s || 10m || 10h>",
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

        const time = ms(args[0])
        const position = player.position;
        const duration = player.queue.current.duration;

        const emojiforward = client.emoji.forward;
        const emojirewind = client.emoji.rewind;

        const song = player.queue.current;
        
        if (time <= duration) {
            if (time > position) {
                player.seek(time);
                let thing = new MessageEmbed()
                    .setDescription(`${emojiforward} **Avançar**\n[${song.title}](${song.uri})\n\`${convertTime(time)} / ${convertTime(duration)}\``)
                    .setColor(client.embedColor)
                    .setTimestamp()
                return message.reply({embeds: [thing]});
            } else {
                player.seek(time);
                let thing = new MessageEmbed()
                    .setDescription(`${emojirewind} **Voltar**\n[${song.title}](${song.uri})\n\`${convertTime(time)} / ${convertTime(duration)}\``)
                    .setColor(client.embedColor)
                    .setTimestamp()
          return message.reply({embeds: [thing]});
            }
        } else {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription(`A duração da buscada excede a duração da música. \n Duração da música: \`${convertTime(duration)}\``);
            return message.reply({embeds: [thing]});
        }
	
    }
};
