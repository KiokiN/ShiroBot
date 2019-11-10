const { Client } = require("discord.js");
const client = new Client();
const fs = require("fs");
require("dotenv").config();

let commands = new Map();

client.on("ready", () => {
    console.log(`Logged in as ${client.user.username}.\n` + 
                "Loading commands...");
    var count = 0;
    fs.readdirSync("./commands").filter((cmd) => cmd.includes(".js")).forEach(cmd => {
        commands.set(`${cmd.slice(0, -3)}`, require(`./commands/${cmd}`));
        count++;
    });
    console.log(`Loaded ${count} commands.`);
});

client.on("message", msg => {
    if(!msg.toString().toLowerCase().startsWith(process.env.prefix)) return;
    let cmd = msg.toString().slice(process.env.prefix.length).split(/ +/);
    let args = cmd.slice(1);
    if(!commands.has(cmd[0])) return;
    commands.get(cmd[0]).run(client, msg, args);
});

client.login(process.env.token);