const { util } = require("../../index.js");
const { ownerIds } = require("../../config.json");

module.exports = {
    name: "unload",
    category: "developer",
    description: "Unload a command without restarting the bot.",
    usage: ["unload <cmd>"],
    cooldown: 0,
    aliases: [],
    run: async(bot, message, args) => {
        if(!ownerIds.includes(message.author.id)) {
            return message.reply(" the `unload` command can only be used by the bot developer.")
        };

        if(!args[0]) return message.channel.send("⚠️ Specify a command to unload.");
        const cmd = args[0].toLowerCase();
        const res = util.unloadCommand(cmd, false);

        switch(res) {
            case "Command Unloaded": {
                message.reply(`✅ Command \`${cmd}\` unloaded successfully.`);
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
                message.reply("An unknown an error occurred while unloading the command.");
              }
            }
  }
}
