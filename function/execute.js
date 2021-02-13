const youtube = require("./youtube");
const ytdl = require("ytdl-core");
const songs = new Array();

const execute = async (msg, id, prefix) => {
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
    if (!songs) return this.msg.channel.send("Playlist is empty!");
    if (songs[1]) return this.msg.channel.send("Added to music playlist!");
    const {
        videoId,
        title,
        likes,
        dislikes,
        viewCount,
        uploadDate: upDate,
        lengthSeconds: length,
    } = songs[0];
    const url = `https://youtube.com/watch?v=${videoId}`;
    this.connection.play(ytdl(url, { fiter: "audioonly" }), {
        type: "unknown",
        volume: 0.5,
        bitrate: "auto",
    }).on("finish" ,()=>{
        songs.shift();
        play();
    });
    return this.msg.channel.send(
        `order: "viewCount"\ntitle : ${title} \nlike : ${likes} \ndislike : ${dislikes} \nviewCount : ${viewCount} \nlength : ${length} \nupDate : ${upDate}`
    );
};

const skip = (id) => {
    console.log("skip");
    console.log(this.query[id]);
};

module.exports = {
    skip: skip,
};

//youtubeSearch("ブルーアーカイブ BGM");


module.exports = {
    execute : execute,
    play : play
};