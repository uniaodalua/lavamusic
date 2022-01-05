const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const db = require("../../schema/prefix.js");

module.exports = {
    name: "setprefix",
    description: "Definir prefixo personalizado",
    options: [
    {
      name: "prefix",
      description: "me dê um novo prefixo",
      required: true,
      type: "STRING"
		}
	],

  
   run: async (client, interaction, prefix) => {
   await interaction.deferReply({
        });
   const data = await db.findOne({ Guild: interaction.guildId});
   const pre = interaction.options.getString("prefix");
   if (!interaction.member.permissions.has('MANAGE_GUILD')) return await interaction.editReply({ ephemeral: true, embeds: [new MessageEmbed().setColor(client.embedColor).setDescription("Você deve ter permissão para `Manage Guild` para usar este comando.")]
    }).catch(() => {});

  if (!pre[0]) {
    const embed = new MessageEmbed()
        .setDescription("Por favor, dê o prefixo que você deseja definir")
        .setColor(client.embedColor)
      return await interaction.editReply({ embeds: [embed] });
    }
    if (pre[1]) {
       const embed = new MessageEmbed()
        .setDescription("Você não pode definir como prefixo um argumento duplo")
        .setColor(client.embedColor)
      return await interaction.editReply({ embeds: [embed] });
    }
    if (pre[0].length > 3) {
       const embed = new MessageEmbed()
        .setDescription("Você não pode enviar prefixo com mais de 3 caracteres")
        .setColor(client.embedColor)
      return await interaction.editReply({ embeds: [embed] });
    }
    if(data) {
      data.oldPrefix = prefix;
      data.Prefix = pre;
      await data.save()
    const update = new MessageEmbed()
    .setDescription(`Your prefix has been updated to **${pre}**`)
    .setColor(client.embedColor)
    .setTimestamp()
    return await interaction.editReply({embeds: [update]});
   } else {
     data = new db({
       Guild : interaction.guildId,
       Prefix : pre,
       oldPrefix: prefix
      });
      await data.save()
    const MessageEmbed = new MessageEmbed()
    .setDescription(`Custom prefix in this server is now set to **${pre}**`)
    .setColor(client.embedColor)
    .setTimestamp()
    return await interaction.editReply({embeds: [embed]});
   }
 }
}
