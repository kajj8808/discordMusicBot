const { DISCODE_TOKEN, PREFIX } = require("./config.json");
const Discord = require("discord.js");
const { execute } = require("./function/execute");

const app = new Discord.Client();
app.login(DISCODE_TOKEN);

app.on("ready", () => {
    console.log("botOnReady!");
});

app.on("message", async (msg) => {
    if (msg.author.bot) return;
    if (!msg.content.startsWith(PREFIX)) return;

    const serverId = msg.guild.id;

    if (msg.content.startsWith(`${PREFIX}play`)) {
        if (msg.member.voice.channel) {
            execute(msg, serverId, PREFIX);
            return;
        }
    } else if (msg.content.startsWith(`${PREFIX}skip`)) {
      //skip(serverId);
      return;
    } else {
      msg.reply("You need to enter a valid Command!");
    }
    //msg.reply("You need to join a voice channel first!");
});
