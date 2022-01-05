const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    name: "about",
    category: "informação",
    aliases: [ "botinfo" ],
    description: "Veja a descrição deste projeto.",
    args: false,
    usage: "",
    permission: [],
    owner: false,
    execute: async (message, args, client, prefix) => {
     
    const row = new MessageActionRow()
			.addComponents(
    new MessageButton()
    .setLabel("Invite")
    .setStyle("LINK")
    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=36768832&scope=applications.commands%20bot`),
    new MessageButton()
    .setLabel("suporte")
    .setStyle("LINK")
    .setURL("https://discord.io/LuxClub")
			);

      const mainPage = new MessageEmbed()
            .setAuthor({ name: 'LuxClub', iconURL: 'https://media.discordapp.net/attachments/900971405477302292/902000220353749062/LOGO_AZUL.png'})
            .setThumbnail('https://media.discordapp.net/attachments/900971405477302292/902000220353749062/LOGO_AZUL.png')
            .setColor('#303236')
            .addField('Creator', '[DaLua#7582](https://github.com/uniaodalua)', true)
            .addField('\u200b',
                `◢ Lux Club ◤ é uma casa de festa com uma decoração moderna que cativa a todos. Agitada DJ’s de verdade que tocam ao vivo, 100% em tempo real e sincronizado, os gêneros variam de eletrônica a funk, agradando pessoas com diversos gostos musicais. Localizada em San Fierro.`
            )
        return message.reply({embeds: [mainPage], components: [row]});
    }
}
