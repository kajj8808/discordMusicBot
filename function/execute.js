const youtube = require("./youtube");
const { embed } = require("../style/discordMsg");
const ytdl = require("ytdl-core-discord");
const songs = new Array();
let playing = false;
const execute = async (msg, prefix) => {
    const word = msg.content.split(`${prefix}play `)[1];
    const voiceChannel = msg.member.voice.channel;
    if (!voiceChannel) {
        return msg.reply("voice channel join!");
    }
    this.msg = msg;
    const song = word.includes("https://www.youtube.com/") 
        ? await youtube.setInfo(word.split("https://www.youtube.com/watch?v=")[1]) 
        : await youtube.search(word);
    songs.push(song);
    play();
};

const play = async () => {
    if (!this.connection) {
        this.connection = await this.msg.member.voice.channel.join();
    }
    if (!songs[0]) return this.msg.channel.send("Playlist is empty!💦");
    if (playing === true) {
        return this.msg.channel.send("Added to music playlist!🎧");
    }   
    const {
        order,
        videoId,
        title,
        thumbnail,
        likes,
        dislikes,
        viewCount,
        uploadDate: upDate,
        lengthSeconds: length,
    } = songs[0];
    const url = `https://youtube.com/watch?v=${videoId}`;
    playing = true;
    this.connection.play(await ytdl(url, { fiter: "audioonly" }), {
        type: "opus",
        volume: 0.5,
        bitrate: "auto",
    }).on("finish" ,()=>{
        songs.shift();
        playing = false;
        play();
    }).on("error" , (err)=>{
        console.log(err);
    });
    return this.msg.channel.send(
        embed(order , title , videoId , likes , dislikes , viewCount , length , upDate , thumbnail)
    );
};

const skip = (id) => {
    console.log("skip");
    console.log(this.query[id]);
};
//youtubeSearch("ブルーアーカイブ BGM");

module.exports = {
    execute : execute,
    play : play,
    skip : skip
};