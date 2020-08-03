const { MessageEmbed } = require("discord.js");
const { inspect } = require("util");

module.exports = {
    name: "eval",
    category: "owner",
    description: "Evaluate js code from discord.",
    usage: ["eval <javascript>"],
    aliases: [],
    cooldown: 0,
    run: async(bot, message, args) => {
        if(["209312132469096449"].includes(message.author.id)) {
            try {
                let toEval = args.join(" ");
                let evaluated = inspect(eval(toEval, { depth: 0 }));

                if(!toEval) {
                    return message.channel.send(`Error while evaluating: \`air\``)
                }else {
                    let hrStart = process.hrtime();
                    let hrDiff;
                    hrDiff = process.hrtime(hrStart);

                    let embed = new MessageEmbed()
                    .setTitle("Eval")
                    .setDescription(`Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.`)
                    .setColor(process.env.color)
                    .setTimestamp()
                    .setFooter(bot.user.username, bot.user.displayAvatarURL({ format: "png", dynamic: true }))
                    .addFields(
                        { name: "To evaluate", value: `\`\`\`js\n${toEval}\`\`\``, inline: false },
                        { name: "Evaluated", value: `\`\`\`js\n${evaluated}\`\`\``, inline: false },
                        { name: "Type of", value: typeof evaluated, inline: false }
                    );

                    message.channel.send(embed);
                }
            }catch(e) {
                return message.channel.send(`Error while evaluating: \`${e.message}\``);
            }
        }else {
            return message.reply(" the `eval` command can only be used by the bot developer.");
        };
    }
}