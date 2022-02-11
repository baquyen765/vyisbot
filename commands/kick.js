const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

exports.execute = async (client, message, args) => {
        try {
            if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("**You don't have the permissions!**").then(msg => {
                    msg.delete({ timeout: 10000 })
            })

            if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("**I don't have the permissions!**").then(msg => {
                    msg.delete({ timeout: 10000 })
            })

            if (!args[0]) return message.channel.send('**Please provide a user to kick!**').then(msg => {
                    msg.delete({ timeout: 10000 })
            })
            //wtf so fast coding

            var kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!kickMember) return message.channel.send("**That user is not in this guild.**").then(msg => {
                    msg.delete({ timeout: 10000 })
            })

            if (kickMember.id === message.member.id) return message.channel.send("**You cannot kick yourself!**").then(msg => {
                    msg.delete({ timeout: 10000 })
            })

            if (!kickMember.kickable) return message.channel.send("**I cannot kick this user!**").then(msg => {
                    msg.delete({ timeout: 10000 })
            })

            var reason = args.slice(1).join(" ");
            try {
                const sembed2 = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`**You have been kicked from ${message.guild.name} for - ${reason || "No reason provided."}**`)
                    .setFooter(message.guild.name, message.guild.iconURL())
                kickMember.send(sembed2).then(() =>
                    kickMember.kick()).catch(() => null)
            } catch {
                kickMember.kick()
            }
            if (reason) {
            var sembed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**${kickMember.user.username}** has been kicked for ${reason}`)
            message.channel.send(sembed);
            } else {
                var sembed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**${kickMember.user.username}** has been kicked`)
            message.channel.send(sembed2);
            }
            let channel = db.fetch(`modlog_${message.guild.id}`)
            if (!channel) return;

            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .setColor("#ff0000")
                .setThumbnail(kickMember.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("**Moderation**", "kick")
                .addField("**User has been kicked**", kickMember.user.username)
                .addField("**Kicked by**", message.author.username)
                .addField("**Reason**", `${reason || "**No reason provided**"}`)
                .addField("**Date**", message.createdAt.toLocaleString())
                .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
        } catch (e) {
            return message.channel.send(`**${e.message}**`)
        }
    }

 exports.help = {
    name: "kick",
    aliases: ["k","kk","kkk"],
    usage: `kick [@user] [reason]`
}