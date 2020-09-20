const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client;

// Set the date we're counting down to
var countDownDate = new Date("May 30, 2024 00:00:00").getTime();

// client.channels.cache.get('757023337003221062')

function getLastMessage() {
    client.channels.cache.get('757023337003221062').messages.fetch({ limit: 1 }).then(messages => {
        return messages.first();
    }).catch(console.error);
}

// Update the count down every 1 second
var x = setInterval(async () => {
    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    client.channels.cache.get('757023337003221062').messages.fetch({ limit: 1 }).then(messages => {
        messages.first().edit(days + ":" + hours + ":" + minutes + ":" + seconds);
    }).catch(console.error);

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(x);

    }
}, 1000);

client.once('ready', () => {
    console.log(client.user.username + ' is ready!');
});

client.on('message', message => {
    if (message.content == "Hi") message.reply('Hi, ' + message.member.user.username + "!");
});

client.login(token);