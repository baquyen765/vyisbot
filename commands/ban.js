const { MessageEmbed } = require('discord.js');
const db = require('quick.db')

exports.execute = (client, message, args) => {
        try {
            if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("**You don't have the permissions!**").then(msg => {
                    msg.delete({ timeout: 5000 })
            })
            if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("**I don't have the permissions!**").then(msg => {
                    msg.delete({ timeout: 5000 })//no!!
            })
            if (!args[0]) return message.channel.send("**Please provide a user!**").then(msg => {
                    msg.delete({ timeout: 5000 })
            })

            let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!banMember) return message.channel.send("**That user is not in this guild.**").then(msg => {
                    msg.delete({ timeout: 5000 })
            })
            if (banMember === message.member) return message.channel.send("**You cannot ban yourself!**").then(msg => {
                    msg.delete({ timeout: 5000 })
            })
            //:owhy:

            var reason = args.slice(1).join(" ");

            if (!banMember.bannable) return message.channel.send("**I cannot ban that user.**").then(msg => {
                    msg.delete({ timeout: 5000 })
            })
            try {
            message.guild.members.ban(banMember)
            banMember.send(`**You have been banned from ${message.guild.name} for - ${reason || "No reason provided"}**`).catch(() => null)
            } catch {
                message.guild.members.ban(banMember)
            }
            if (reason) {
            var sembed = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**${banMember.user.username}** has been banned for ${reason}`)
            message.channel.send(sembed)
            } else {
                var sembed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription(`**${banMember.user.username}** has been banned`)

            message.channel.send(sembed2)
            }
            let channel = db.fetch(`modlog_${message.guild.id}`)
            if (channel == null) return;

            if (!channel) return;

            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .setColor("#ff0000")
                .setThumbnail(banMember.user.displayAvatarURL({ dynamic: true }))
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("**Moderation**", "ban")
                .addField("**Banned**", banMember.user.username)
                .addField("**ID**", `${banMember.id}`)
                .addField("**Banned by**", message.author.username)
                .addField("**Reason**", `${reason || "**No reason**"}`)
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
    name: "ban",
    aliases: ["b", "thor"],
    usage: `ban [@user] [reason]`
}

