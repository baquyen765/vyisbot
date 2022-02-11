const { MessageEmbed } = require("discord.js");
const { format, createBar } = require("/home/runner/bot-testing/pp.js")
exports.execute = async (client, message, args) => {
const Discord = require('discord.js')
const DisTube = require("distube"); // so 
const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true, highWaterMark: 1 << 25 });
const { channel } = message.member.voice;

      if(!channel)
        return message.channel.send(new MessageEmbed()
           .setColor('#FF0000')
          .setFooter(`D:`)
          .setTitle(`❌ ERROR | Please join a Channel first`)
        );
      if(!client.distube.getQueue(message))
        return message.channel.send(new MessageEmbed()
           .setColor('#FF0000')
          .setFooter(`v!play despacito`) 
          .setTitle(`❌ ERROR | I am not playing something`)//it's an error msg
          //yea just saying
          //keep this so random people can see the progess lol
          //this is masterpiece
          //most of the commands are copy pasted from autoplay one can confirm
          .setDescription(`The Queue is empty`)
        );
      if(client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id)
        return message.channel.send(new MessageEmbed()
          .setColor('#FF0000')
          .setFooter(`nerd`)
          .setTitle(`❌ ERROR | Please join **my** Channel first`)
          .setDescription(`Channelname: \`${message.guild.me.voice.channel.name}\``)
        );
      let queue = client.distube.getQueue(message);
      let track = queue.songs[0];
      console.log(track)
      const embed = new Discord.MessageEmbed()
        .setColor('#00FF00')
        .setTitle(`Now playing :notes: ${track.name}`.substr(0, 256))
        .setURL(track.url)
        .setThumbnail(track.thumbnail)
        .addField("Views", `▶ ${track.views}`,true)
        .addField("Likes", `:thumbsup: ${track.likes}`,true)
        .addField("Duration: ", createBar(queue.currentTime / queue.maxTime))
        .setTimestamp()
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp();
        return message.channel.send(embed);
      
  }   

//we only need to delet error messages
//imagine failing at pasting
//watafa
// it will post it in the console dw bout that    
//not everyone can see the console
//stackoverflow is gud
//fucking took like 30 minutes just to realize i missed a , in pp.js
// i mean most of these commands are still pretty standard
// we don't have games yet
//maybe i will add some
//you do it
//i never got away from the laptop since this morning except lunch :sob:
// also you want rps to NOT be rng

exports.help = {
    name: "nowplaying",
    aliases: ["vi", "np"],
    usage: `vidinfo`
  
}
