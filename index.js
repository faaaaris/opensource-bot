require("dotenv").config();
const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");

const bot = new Client({
    fetchAllMembers: true
});

const utils = require("./utils/util.js");
const util = new utils.Utils(bot, process.cwd());
module.exports = { bot, util };

bot.active = new Collection();
bot.commands = new Collection();
bot.aliases = new Collection();
bot.categories = readdirSync("./commands/");
bot.cooldowns = new Collection();

["command", "event"].forEach(handler => {
  require(`./handlers/${handler}`)(bot);
});

bot.login(process.env.TOKEN);