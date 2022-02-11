exports.execute = async (client, message, args) => {
const discord = require('discord.js')
const distube = require('distube')
 if(!message.member.voice.channel) return message.reply('Please join a vc before using this cmd').then(msg => {
         msg.delete({ timeout: 5000 })
 })
    let queue = await client.distube.getQueue(message)
    if(!queue) message.channel.send('Party is over, disconnecting..')
    const q = queue.songs.map((song, i) => `${i === 0 ? "Playing: " : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).join("\n")
    message.channel.send(q)
    
        
    
}

exports.help = {
    name: "queue",
    aliases: ["q"],
    usage: `queue`
}