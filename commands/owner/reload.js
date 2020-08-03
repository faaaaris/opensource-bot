const { util } = require("../../index.js");

module.exports = {
    name: "reload",
    category: "developer",
    description: "Reload a command without restarting the bot.",
    usage: ["reload <cmd>"],
    cooldown: 0,
    aliases: [],
    run: async(bot, message, args) => {
        if(!["209312132469096449"].includes(message.author.id)) {
            return message.reply(" the `reload` command can only be used by the bot developer.")
        };

        if(!args[0]) return message.channel.send("⚠️ Specify a command to reload.");
        const cmd = args[0].toLowerCase();
        const res = util.reloadCommand(cmd);

        switch(res) {
            case "Command Loaded": {
                message.reply(`✅ Command \`${cmd}\` reloaded successfully.`);
                break;
            }
            case "Command Not Loaded": {
                message.reply(`⚠️ Command \`${cmd}\` was never loaded. Use \`-load ${cmd}\` to load it.`);
                break;
            }
            case "Unknown Command": {
                message.reply("⚠️ The command provided does not exist.");
                break;
            }
            case "Error": {
                message.reply("An unknown an error occurred while reloading the command.");
                break;
            }
        }
    }
}