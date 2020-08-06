const { MessageEmbed } = require("discord.js");
const { embedColor } = require("../../config.json");

module.exports = {
    name: "serverinfo",
    category: "information",
    description: "Returns information about the server.",
    usage: ["serverinfo"],
    aliases: ["guildinfo"],
    cooldown: 2,
    run: async(bot, message, args) => {
        const bans = await message.guild.fetchBans();

        const embed = new MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true, format: "png" }))
        .setColor(embedColor)
        .setThumbnail(message.guild.iconURL({ dynamic: true, format: "png" }))
        .setFooter(`ID: ${message.guild.id} | Server Created`)
        .setTimestamp(new Date(message.guild.createdAt))
        .addFields(
            { name: "Owner", value: `<@!${message.guild.owner.id}>\n${message.guild.owner.user.tag}`, inline: true },
            { name: "Region", value: message.guild.region, inline: true },
            { name: "Members", value: message.guild.members.cache.size, inline: true },
            { name: "Text Channels", value: message.guild.channels.cache.filter(c => c.type === "text").size, inline: true },
            { name: "Voice Channels", value: message.guild.channels.cache.filter(c => c.type === "voice").size, inline: true },
            { name: "Roles", value: message.guild.roles.cache.size-1, inline: true },
            { name: "Bans", value: bans.size, inline: true },
            { name: "Emojis", value: message.guild.emojis.cache.size, inline: true }
        );

        message.channel.send(embed);
    }
}