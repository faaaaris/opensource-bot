const { MessageEmbed, Message } = require("discord.js");
const { resolveMember } = require("../../handlers/functions");
const { embedColor } = require("../../config.json");
const moment = require("moment");

module.exports = {
    name: "whois",
    category: "information",
    description: "Returns information of a user.",
    usage: ["whois [mention | name | id]"],
    aliases: ["userinfo"],
    cooldown: 2,
    run: async (bot, message, args) => {
        let member = args.length ? resolveMember(message, args.join(" ")) : message.member;
        if (!member) return message.channel.send(`Couldn't find user ${args.join(" ")}`);

        const perms = {
            ADMINISTRATOR: "Administrator",
            MANAGE_GUILD: "Manage Guild",
            MANAGE_ROLES: "Manage Roles",
            MANAGE_CHANNELS: "Manage Channels",
            MANAGE_MESSAGES: "Manage Messages",
            MANAGE_WEBHOOKS: "Manage Webhooks",
            MANAGE_NICKNAMES: "Manage Nicknames",
            MANAGE_EMOJIS: "Manage Emojis",
            KICK_MEMBERS: "Kick Members",
            BAN_MEMBERS: "Ban Members",
            MENTION_EVERYONE: "Mention Everyone"
        };

        const joinPos = [...message.guild.members.cache.values()]
            .sort((a, b) => (a.joinedAt < b.joinedAt) ? -1 : ((a.joinedAt > b.joinedAt) ? 1 : 0))
            .filter(m => !m.bot)
            .findIndex(m => m.id === member.id) + 1;

        const roles = member.roles.cache
            .filter(r => r.id !== message.guild.id)
            .sort((a, b) => (a.position !== b.position) ? b.position - a.position : a.id - b.id)
            .map(r => r).join(" ");

        const embed = new MessageEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL({ format: "png", dynamic: true }))
            .setColor(embedColor)
            .setTimestamp()
            .setThumbnail(member.user.displayAvatarURL({ format: "png", dynamic: true }))
            .setFooter(`ID: ${member.user.id}`)
            .setDescription(`<@!${member.user.id}>`)
            .addFields(
                { name: "Joined", value: moment.unix(member.joinedAt / 1000).format("llll"), inline: true },
                { name: "Join Position", value: joinPos || "None", inline: true },
                { name: "Registered", value: moment.unix(member.user.createdAt / 1000).format("llll"), inline: true },
                { name: `Roles [${member.roles.cache.size - 1}]`, value: roles.length > 1024 ? "Too many roles to show." : roles || "None", inline: false }
            )

        let keys = Object.keys(perms);
        let values = Object.values(perms);
        let permissionsArray = [];

        for (let i = 0; i < keys.length; i++) {
            if (member.hasPermission(keys[i])) {
                permissionsArray.push(values[i]);
            }
        };

        if (permissionsArray.length > 0) {
            embed.addField(`Key Permissions [${permissionsArray.length}]`, permissionsArray.join(", "))
        };

        message.channel.send(embed);
    }
}