const { util } = require("../../index.js");

module.exports = {
    name: "load",
    category: "developer",
    description: "Load a command without restarting the bot.",
    usage: ["load <cmd>"],
    cooldown: 0,
    aliases: [],
    run: async(bot, message, args) => {
        if(!["209312132469096449"].includes(message.author.id)) {
            return message.reply(" the `load` command can only be used by the bot developer.")
        };

        if(!args[0]) return message.channel.send("⚠️ Specify a command to load.");
        const cmd = args[0].toLowerCase();
        const res = util.loadCommand(cmd, false);

        switch(res) {
            case "Command Loaded": {
                message.reply(`✅ Command \`${cmd}\` loaded successfully.`);
                break;
            }
            case "Command Already Loaded": {
                message.reply(`⚠️ Command \`${cmd}\` has already been loaded.`);
                break;
            }
            case "Unknown Command": {
                message.reply("⚠️ The command provided does not exist.");
                break;
            }
            case "Error": {
                message.reply("An unknown an error occurred while loading the command.");
                break;
            }
        }
    }
}