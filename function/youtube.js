const ytdl = require("ytdl-core");
const { api } = require("../api");

const setInfo = async (videoId) => {
    console.log(videoId)
    const url = `https://youtube.com/watch?v=${videoId}`;
    const { videoDetails } = await ytdl.getInfo(url);
    const song = {
        title: videoDetails.title,
        lengthSeconds: videoDetails.lengthSeconds,
        viewCount: videoDetails.viewCount,
        uploadDate: videoDetails.uploadDate,
        likes: videoDetails.likes,
        dislikes: videoDetails.dislikes,
        videoId: videoId,
    };
    return song;
};

const search = async (word) => {
    const {
        data: { items },
    } = await api.get("search", {
        params: {
            order: "viewCount",
            q: word,
        },
    });
    const {id: { videoId }} = items[0];
    const {id: { playlistId } } = items[0];
    /*items[0] => playList*/
    if (!videoId) {
        const { data: { items: playList } } = await api.get("playlistItems", {
            params: {
                playlistId: playlistId,
            }
        });
        const { snippet: { resourceId: { videoId }}} = playList[0];
        return setInfo(videoId);
    } else {
        return setInfo(videoId);
    }
};

const fs = require("fs");

const downLoader = (videoId) =>{
    try {
        fs.readFile(`audio/${videoId}.mp3`);
        return;
    } catch {
    }
};


module.exports = {
    setInfo : setInfo,
    search : search
}