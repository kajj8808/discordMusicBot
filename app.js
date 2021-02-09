const { DISCODE_TOKEN } = require("./config.json");
const Discord = require("discord.js");

const app = new Discord.Client();
app.login(DISCODE_TOKEN);

app.on("ready", () => {
  console.log("botOnReady!");
});

app.on("message", async (msg) => {
  if (msg.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  if (msg.content.startsWith("/play ")) {
    if (msg.member.voice.channel) {
      execute(msg);
      return;
    } else {
      msg.reply("You need to join a voice channel first!");
    }
  }

  if (msg.content === "/skip") {
    return;
  }
  
});


