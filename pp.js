module.exports = {
   format: function(millis) {
    try{
      var h = Math.floor(millis / 3600000),
        m = Math.floor(millis / 60000),
        s = ((millis % 60000) / 1000).toFixed(0);
      if (h < 1) return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
      else return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s + " | " + (Math.floor(millis / 1000)) + " Seconds";
    }catch (e){
      console.log(String(e.stack).bgRed)
    }
  },
  createBar: function(maxtime, currenttime, size = 25, line = "▬", slider = "🔶") {
    try{
      let bar = currenttime > maxtime ? [line.repeat(size / 2 * 2), (currenttime / maxtime) * 100] : [line.repeat(Math.round(size / 2 * (currenttime / maxtime))).replace(/.$/, slider) + line.repeat(size - Math.round(size * (currenttime / maxtime)) + 1), currenttime / maxtime];
      if (!String(bar).includes("🔶")) return `**[🔶${line.repeat(size - 1)}]**\n**`(queue.currentTime / queue.maxTime)`**`;
      return `**[${bar[0]}]**\n**${new Date(currenttime).toISOString().substr(11, 8)+" / "+(maxtime==0?" ◉ LIVE":new Date(maxtime).toISOString().substr(11, 8))}**`;
    }catch (e) {
      console.log(String(e.stack).bgRed)
    }
},
   promptMessage: async function (message, author, time, validReactions) {

        time *= 1000;


        for (const reaction of validReactions) await message.react(reaction);

        const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;


        return message
            .awaitReactions(filter, { max: 1, time: time})
            .then(collected => collected.first() && collected.first().emoji.name);
    }
}
