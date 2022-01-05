const { MessageEmbed } = require("discord.js");
const db = require("../../schema/prefix.js");
module.exports = {
    name: "setprefix",
    category: "Config",
    description: "Definir prefixo personalizado",
    args: false,
    usage: "",
    aliases: ["prefix"],
    permission: [],
    owner: false,
  execute: async (message, args, client, prefix) => {
    
    const data = await db.findOne({ Guild: message.guildId});
    const pre = await args.join(" ")
    if (!message.member.permissions.has('MANAGE_GUILD')) return message.reply('Você deve ter permissão de `Manage Guild` para usar este comando.');
    if (!pre[0]) {
    const embed = new MessageEmbed()
        .setDescription("Por favor, dê o prefixo que você deseja definir!")
        .setColor(client.embedColor)
      return message.reply({ embeds: [embed] });
    }
    if (pre[1]) {
       const embed = new MessageEmbed()
        .setDescription("Você não pode definir como prefixo um argumento duplo!")
        .setColor(client.embedColor)
      return message.reply({ embeds: [embed] });
    }
    if (pre[0].length > 3) {
       const embed = new MessageEmbed()
        .setDescription("Você não pode enviar prefixo com mais de 3 caracteres")
        .setColor(client.embedColor)
      return message.reply({ embeds: [embed] });
    }
     if(data) {
       data.oldPrefix = prefix;
       data.Prefix = pre;
       await data.save()
     const update = new MessageEmbed()
     .setDescription(`Your prefix has been updated to **${pre}**`)
     .setColor(client.embedColor)
     .setTimestamp()
     return message.reply({embeds: [update]});
    } else {
      data = new db({
        Guild : message.guildId,
        Prefix : pre,
        oldPrefix: prefix
       });
       await data.save()
     const MessageEmbed = new MessageEmbed()
     .setDescription(`Custom prefix in this server is now set to **${pre}**`)
     .setColor(client.embedColor)
     .setTimestamp()
     return message.reply({embeds: [embed]});

    }
  }
};
