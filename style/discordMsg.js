const Discord = require("discord.js");

const embed = (order, title, videoId, likes, dislikes, viewCount, length, upDate , thumbnail) => {
    const example = new Discord.MessageEmbed()
        .setColor("#3498db")
        .setTitle(`🎵 ${title}`)
        .setURL(`https://youtube.com/watch?v=${videoId}`)
        .setDescription(`OrderBy : ${order}`)
        .addFields(
            { name: "UpDate", value: upDate },
            { name: "Length", value: length },
            { name: "Likes  👍", value: likes, inline: true },
            { name: "DisLikes  👎", value: dislikes, inline: true },
            { name: "ViewCount", value: viewCount, inline: true }
        )
        .setImage(thumbnail)
        .setTimestamp()
        .setFooter('kajj8808#1144 ⚙ ', 'http://drive.google.com/uc?export=view&id=1vvD6IDopLAZT74bIAj2-gLje-SIYdo-I')
    return example;
};

module.exports = {
    embed : embed
};
//.setAuthor('YouTube')
//https://discordjs.guide/popular-topics/embeds.html#using-the-richembedmessageembed-constructor