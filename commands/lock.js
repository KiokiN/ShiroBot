module.exports.run = (client, msg, args) => {
    if(msg.member.hasPermission("MANAGE_CHANNELS")) {
        try {
            let channel = msg.member.voiceChannel
            if(!channel) {
                msg.reply("You aren't in a voice channel.");
            } else {
                channel.overwritePermissions(channel.guild.defaultRole, { SPEAK: false, CONNECT: false });
                msg.channel.send("🔒 Locked!")
            }
        } catch(err) {
            console.log("ERROR! Logged to console.");
            console.error(err);
        }
    }
}