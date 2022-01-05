const { MessageEmbed } = require("discord.js");

module.exports = async (client, player, track, payload) => {
    
    const channel = client.channels.cache.get(player.textChannel);
    const thing = new MessageEmbed()
        .setColor("RED")
        .setDescription("❌ Erro ao carregar música! A pista está presa");
    channel.send({embeds: [thing]});
    client.logger.log(`Erro ao carregar música! A pista está presa em [${player.guild}]`, "error");
    if (!player.voiceChannel) player.destroy();

			}
