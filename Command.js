const ytdl = require("ytdl-core");
const fs = require("fs");
const axios = require("axios");
const songs = new Array();
const request = require("request");
const { YOUTUBE_API_KEY } = require("./config.json");

const execute = async (msg, id, prefix) => {
    const word = msg.content.split(`${prefix}play `)[1];
    const voiceChannel = msg.member.voice.channel;
    if (!voiceChannel) {
        return msg.reply("voice channel join!");
    }
    this.msg = msg;
    word.includes("https://www.youtube.com/")
        ? youtubeSetSongs(word, id)
        : youtubeSearch(word);
};  

const youtubeSetSongs = async (url) => {
    const { videoDetails } = await ytdl.getInfo(url);
    console.log(await ytdl.getInfo(url));
    /*
     codecs: 'avc1.42001E, mp4a.40.2',
      videoCodec: 'avc1.42001E',
      audioCodec: 'mp4a.40.2',
    */
    const song = {
        title: videoDetails.title,
        lengthSeconds : videoDetails.lengthSeconds,
        viewCount: videoDetails.viewCount,
        uploadDate : videoDetails.uploadDate,
        likes : videoDetails.likes,
        dislikes : videoDetails.dislikes,
        url: url
    };
    songs.push(song);
    play( );
};

const api = axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3/",
    params: {
        maxResults: 1,
        part: "snippet",
        key: YOUTUBE_API_KEY
    },
});

const youtubeSearch = async (word) => {
    const {data : {items}} = await api.get("search", {
        params: {
            order : "viewCount",
            q: word
        }
    });
    const youtubeUrl = "https://youtube.com/watch?v=";
    const {id: { videoId }} = items[0];
    const {id: { playlistId }} = items[0];
    /*items[0] => playList*/
    if(!videoId) {
        const { data : {items : playList}} = await api.get("playlistItems" ,{ 
            params: {
                playlistId : playlistId
            }
        }); 
        const { snippet : {resourceId : {videoId}}} = playList[0];
        youtubeSetSongs(`${youtubeUrl}${videoId}`);
    } else {
        youtubeSetSongs(`${youtubeUrl}${videoId}`);
    }
};

const play = async() => {
    if(!this.connection){
        this.connection = await this.msg.member.voice.channel.join();
    }
    const url = songs[0].url;
    this.connection.play(ytdl(url , {fiter : "audioonly"}),{
        type : "unknown",
        volume : 0.5,
        bitrate : "auto"
    });
};

const skip = (id) => {
    console.log("skip");
    console.log(this.query[id]);
};

module.exports = {
    execute: execute,
    skip: skip,
};

//youtubeSearch("ブルーアーカイブ BGM");
