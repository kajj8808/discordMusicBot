const ytdl = require("ytdl-core");
const { api } = require("../api");
const fs = require("fs");

const setInfo = async (videoId , order = "url") => {
    const url = `https://youtube.com/watch?v=${videoId}`;
    const { videoDetails } = await ytdl.getInfo(url);
    const thumbnail = videoDetails.thumbnails[4]['url'] ? videoDetails.thumbnails[4]['url'] : videoDetails.thumbnails[3]['url'];
    const song = {
        order : order,
        title: videoDetails.title,
        thumbnail : thumbnail,
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
    const order = "viewCount";
    const {
        data: { items },
    } = await api.get("search", {
        params: {
            order: order,
            q: word,
        },
    });
    //제일위에 검색되는것이 channelId 로 되어있는 부분이있어서.
    const {id: { channelId }} = items[0];
    if (channelId){
        items.shift();
    }
    /*items[0] => playList*/
    const {id: { videoId }} = items[0];
    const {id: { playlistId } } = items[0];
    if (!videoId) {
        const { data: { items: playList } } = await api.get("playlistItems", {
            params: {
                playlistId: playlistId,
            }
        });
        const { snippet: { resourceId: { videoId }}} = playList[0];
        return setInfo(videoId , order);
    } else {
        return setInfo(videoId , order);
    }
};

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