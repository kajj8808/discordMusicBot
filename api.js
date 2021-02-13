const axios = require("axios");
const { YOUTUBE_API_KEY } = require("./config.json");

const api = axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3/",
    params: {
        maxResults: 1,
        part: "snippet",
        key: YOUTUBE_API_KEY,
    },
});

module.exports = {
    api : api
};