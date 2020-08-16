const path = require('path');
var fs = require('fs');

const soundFiles = fs.readdirSync("sounds")
    .map(file => {
        return path.join("sounds", file);
    });


const Discord = require('discord.js');
const client = new Discord.Client();



client.on('ready', () => {
    client.user.setStatus('online')
    console.log(`Logged in as ${client.user.tag}!`);
    console.log('Loaded ' + soundFiles.length + ' soundes!')
});

client.on('voiceStateUpdate', function (oldMember, newMember) {
    console.log('Voice state update');
    if (client.user.id != newMember.id && newMember.channel == null) {
        console.log('User left');
        joinAndPlay(oldMember.channel);
    }
});

async function joinAndPlay(channel) {
    var connection = await channel.join();
    var randomItem = soundFiles[Math.floor(Math.random() * soundFiles.length)];
    console.log('Playing ' + randomItem + ' in channel ');
    var dispatcher = connection.play(randomItem, { volume: 0.3 });

    dispatcher.on('finish', () => {
        dispatcher.destroy();
        connection.disconnect();
    });


}


client.login(process.env.TOKEN);