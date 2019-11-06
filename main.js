const { Client } = require("discord.js");
const client = new Client();
const fs = require("fs");
require("dotenv").config();

client.on("ready", () => {
    console.log(`Logged in as ${client.user.username}.`);
});

client.on("message", msg => {
    // Check if is a command
    if(!msg.toString().toLowerCase().startsWith(process.env.prefix)) return;
    
    // Isolate arguments
    let cmd = msg.toString().slice(process.env.prefix.length).split(/ +/);
    
    // Check if command exists
    if(!fs.existsSync(`./commands/${cmd[0]}.js`)) return;

    // Isolate args
    let args = cmd.slice(1);

    // Run command
    require(`./commands/${cmd[0]}.js`).run(client, msg, args);
});

client.login(process.env.token);