const Discord = require("discord.js");
exports.execute = (client, message, args) => {
  
  if(message.member.hasPermission("MANAGE_MESSAGES")) 
 {

 const deleteCount = parseInt(args[0], 10);

    if(!deleteCount || deleteCount > 100 || deleteCount < 1)
      return message.reply("Please provide a number smaller than 100");
    
  
    // So we bulk delete the last `deleteCount` messages. Simple enough, right?
    message.channel.bulkDelete(deleteCount + 1)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`))
      
        const pembed = new Discord.MessageEmbed()
        .setTitle('message is gone')
        .setDescription('bing bang boom  message is gone')
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
        .setColor("GREEN")
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        return message.channel.send(pembed)

}   
else return message.channel.send(`no perm bitch`) 
}
        


exports.help = {
    name: "purge",
    aliases: ["purge", "wipe"],
    usage: `purge [1-100]`
}
