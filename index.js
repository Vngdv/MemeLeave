// Configuration constats
const defaultVolume = 0.6;

function loadSoundFiles() {
    const path = require('path');
    const fs = require('fs');

    return fs.readdirSync("sounds")
        .filter(fname => fname.endsWith(".mp3"))
        .map(fname => {
            return path.join("sounds", fname);
        });
}

const soundFiles = loadSoundFiles();

function randomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Check if there were sound files and stop if there are none.
if (soundFiles.length == 0) {
    console.error('No sound files found! Stopping the bot');
    process.exit(1);
}

// If the process is still running print out the amount of sounds we loaded.
console.log('Loaded ' + soundFiles.length + ' soundes!')

// Initialize discord and add some events
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    client.user.setStatus('online');
    console.log(`Logged in as ${client.user.tag}!`);

});

// Voice state update is used to determine if a user has left the voice chat.
client.on('voiceStateUpdate', function (oldMember, newMember) {
    if (client.user.id != newMember.id && newMember.channel == null) {
        joinAndPlay(oldMember.channel);
    }
});

function joinAndPlay(channel) {
    channel.join().then(conn => {
        var randomItem = randomFromArray(soundFiles);

        console.log('Playing ' + randomItem);
        var dispatcher = conn.play(randomItem, { volume: defaultVolume });

        dispatcher.on('finish', () => {
            dispatcher.destroy();
            conn.disconnect();
        });
    });
}


client.login(process.env.TOKEN).catch(err => {
    console.error('Client was not able to login to Discord.\n' + err);
    process.exit(1);
});
