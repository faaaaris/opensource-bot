const { bot } = require("../../index.js");

module.exports = () => {
    console.log(`${bot.user.username} is online!`);
}