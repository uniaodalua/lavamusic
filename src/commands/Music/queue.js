
const { Client, Message, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const pms = require("pretty-ms");
const load = require("lodash");

module.exports = {
    name: "queue",
    category: "Music",
    aliases: ["q"],
    description: "Mostra a fila de músicas tocando agora.",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    player: true,
    inVoiceChannel: false,
    sameVoiceChannel: false,
   execute: async (message, args, client, prefix) => {
  
            const player = client.manager.get(message.guild.id);
            if(!player) return message.channel.send({ embeds: [new MessageEmbed().setColor(client.embedColor).setTimestamp().setDescription(`Nothing is playing right now.`)]});
            
            if(!player.queue) return message.channel.send({ embeds: [new MessageEmbed().setColor(client.embedColor).setTimestamp().setDescription(`Nothing is playing right now.`)]});
           
            if(player.queue.length === "0" || !player.queue.length) {
                const embed = new MessageEmbed()
                .setColor(client.embedColor)
                .setDescription(`Tocando agora [${player.queue.current.title}](${player.queue.current.uri}) • \`[ ${pms(player.position)} / ${pms(player.queue.current.duration)} ]\` • [${player.queue.current.requester}]`)

                await message.channel.send({
                    embeds: [embed]
                }).catch(() => {});
            } else {
                const queuedSongs = player.queue.map((t, i) => `\`${++i}\` • [${t.title}](${t.uri}) • \`[ ${pms(t.duration)} ]\` • [${t.requester}]`);

                const mapping = load.chunk(queuedSongs, 10);
                const pages = mapping.map((s) => s.join("\n"));
                let page = 0;

                if(player.queue.size < 11) {
                    const embed = new MessageEmbed()
                    .setColor(client.embedColor)
                    .setDescription(`**Tocando agora**\n[${player.queue.current.title}](${player.queue.current.uri}) • \`[ ${pms(player.position)} / ${pms(player.queue.current.duration)} ]\` • [${player.queue.current.requester}]\n\n**Queued Songs**\n${pages[page]}`)
                    .setTimestamp()
                    .setFooter(`Page ${page + 1}/${pages.length}`, message.author.displayAvatarURL({ dynamic: true }))
                    .setThumbnail(player.queue.current.thumbnail)
                    .setTitle(`${message.guild.name} Queue`)

                    await message.channel.send({
                        embeds: [embed]
                    })
                } else {
                    const embed2 = new MessageEmbed()
                    .setColor(client.embedColor)
                    .setDescription(`**Tocando agora**\n[${player.queue.current.title}](${player.queue.current.uri}) • \`[ ${pms(player.position)} / ${pms(player.queue.current.duration)} ]\` • [${player.queue.current.requester}]\n\n**Queued Songs**\n${pages[page]}`)
                    .setTimestamp()
                    .setFooter(`Page ${page + 1}/${pages.length}`, message.author.displayAvatarURL({ dynamic: true }))
                    .setThumbnail(player.queue.current.thumbnail)
                    .setTitle(`${message.guild.name} Queue`)

                    const but1 = new MessageButton()
                    .setCustomId("queue_cmd_but_1")
                    .setEmoji("⏭️")
                    .setStyle("PRIMARY")

                    const but2 = new MessageButton()
                    .setCustomId("queue_cmd_but_2")
                    .setEmoji("⏮️")
                    .setStyle("PRIMARY")

                    const but3 = new MessageButton()
                    .setCustomId("queue_cmd_but_3")
                    .setEmoji("⏹️")
                    .setStyle("DANGER")

                    const row1 = new MessageActionRow().addComponents([
                        but2, but3, but1
                    ]);

                    const msg = await message.channel.send({
                        embeds: [embed2],
                        components: [row1]
                    })

                    const collector = message.channel.createMessageComponentCollector({
                        filter: (b) => {
                            if(b.user.id === message.author.id) return true;
                            else {
                                b.reply({
                                    ephemeral: true,
                                    content: `Só você **${message.author.tag}** pode usar este botão, se você quiser, terá que executar o comando novamente.`
                                });
                                return false;
                            };
                        },
                        time: 60000*5,
                        idle: 30e3
                    });

                    collector.on("collect", async (button) => {
                        if(button.customId === "queue_cmd_but_1") {
                            await button.deferUpdate().catch(() => {});
                            page = page + 1 < pages.length ? ++page : 0;

                            const embed3 = new MessageEmbed()
                            .setColor(client.embedColor)
                            .setDescription(`**Tocando agora**\n[${player.queue.current.title}](${player.queue.current.uri}) • \`[ ${pms(player.position)} / ${pms(player.queue.current.duration)} ]\` • [${player.queue.current.requester}]\n\n**Queued Songs**\n${pages[page]}`)
                            .setTimestamp()
                            .setFooter({text: `Page ${page + 1}/${pages.length}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                            .setThumbnail(player.queue.current.thumbnail)
                            .setTitle(`${message.guild.name} Queue`)

                            await msg.edit({
                                embeds: [embed3],
                                components: [row1]
                            })
                        } else if(button.customId === "queue_cmd_but_2") {
                            await button.deferUpdate().catch(() => {});
                            page = page > 0 ? --page : pages.length - 1;

                            const embed4 = new MessageEmbed()
                            .setColor(client.embedColor)
                            .setDescription(`**Tocando agora**\n[${player.queue.current.title}](${player.queue.current.uri}) • \`[ ${pms(player.position)} / ${pms(player.queue.current.duration)} ]\` • [${player.queue.current.requester}]\n\n**Queued Songs**\n${pages[page]}`)
                            .setTimestamp()
                            .setFooter({text: `Page ${page + 1}/${pages.length}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
                            .setThumbnail(player.queue.current.thumbnail)
                            .setTitle(`${message.guild.name} Fila`)

                            await msg.edit({
                                embeds: [embed4],
                                components: [row1]
                            }).catch(() => {});
                        } else if(button.customId === "queue_cmd_but_3") {
                            await button.deferUpdate().catch(() => {});
                            collector.stop();
                        } else return;
                    });

                    collector.on("end", async () => {
                        await msg.edit({
                            components: []
                        })
                    });
                }
            }
       }
  };
