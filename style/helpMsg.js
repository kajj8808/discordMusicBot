const Discord = require("discord.js");

const embed = ( prefix ) => {
    const example = new Discord.MessageEmbed()
        .setColor("#1abc9c")
        .setTitle(`OverView`)
        .setDescription(`Command List`)
        .addFields(
            { name: `${prefix}play`, value: "play!" },
            { name: `${prefix}skip`, value: "skip!" },
            { name: `${prefix}help`, value: "showing Commands!✨✨" },
        )
        .setTimestamp()
        .setFooter('kajj8808#1144 ⚙ ', 'http://drive.google.com/uc?export=view&id=1vvD6IDopLAZT74bIAj2-gLje-SIYdo-I')
    return example;
};

module.exports = {
    helpEmbed : embed
};
//.setAuthor('YouTube')
//            { name: `${prefix}auto`, value: "이전에 노래들을 랜덤으로!💿" },

//https://discordjs.guide/popular-topics/embeds.html#using-the-richembedmessageembed-constructor