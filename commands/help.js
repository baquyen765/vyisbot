const { MessageEmbed } = require("discord.js");

exports.execute = async (client, message, args) => {
    const embed = new MessageEmbed()
        .setTitle("Commands")
        .setDescription(`Total Commands: ${client.commands.size} | Server Prefix: ${client.prefix}`)
        .setColor("BLURPLE")
        .setTimestamp()
        .setThumbnail(client.user.displayAvatarURL)
        .setFooter(message.author.username) //stupid   nô
        .setImage(message.author.avatarURL)
    client.commands.forEach(cmd => {
        embed.addField(`${cmd.help.name}`, `Aliases: ${cmd.help.aliases.join(", ") || "None"}\nUsage: \`${client.prefix}${cmd.help.usage}\``, true);
    });
    return message.channel.send(embed);
} //you didnt 
exports.help = {
    name: "help",
    aliases: ["h"],
    usage: `help`
}
