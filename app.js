'use strict';

const irc = require('irc');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const NODE_ENV = process.env.NODE_ENV || 'development';
let config = loadEnv();
console.log(config);

// const client = new irc.Client(
//     'rajaniemi.freenode.net',
//     'ctfbot',
//     { channels: ['#ctf-bot-test'] }
// );

const messagesListner = {};

function loadEnv() {
    try {
        const file = NODE_ENV != 'production' ? 'config.json': 'dev-config.json'
        return JSON.parse(fs.readFileSync(file));
    } catch (err) {
        console.error(err);
        process.exit();
    }
}

//Generic message handler
function respondMessage(message, idle, action) {
    messagesListner[message] = {idle, action};
}

//Listeners

//Message Listener
client.addListener('message', function (from, to, message) {
    if (messagesListner[message]) {
        const msg = messagesListner[message];
        if (msg.idle > (new Date().getTime() - msg.timer)) {
            client.say('#ctf-bot-test', `To ocupado!!!`);
            return;
        }
        msg.timer = new Date().getTime();
        msg.action();
    }
});
//Give voice for new members join when they join
client.addListener('join', function(channel, who){
	if(who !== 'ctfbot'){
		client.send('MODE', channel, '+v', who);
	}
});
//Error handler
client.addListener('error', function(error){
	console.log(error);
});


//Message handlers
respondMessage('!nextctf', 10000, () => {
    upcomingCtf()
        .then(ctf => {
            client.say('#ctf-bot-test', `Nome: ${ctf.name}`)
            client.say('#ctf-bot-test', `Data: ${ctf.date}`)
            client.say('#ctf-bot-test', `Tipo: ${ctf.type}`)
            client.say('#ctf-bot-test', `Site: ${ctf.link}`)
        })
        .catch(err => {
            client.say('#ctf-bot-test', `${err}`);
        });
});

//Helper Functions
function upcomingCtf() {
    return new Promise((resolve, reject) => {
        request('https://ctftime.org/event/list/upcoming', (error, response, body) => {
            if (error) reject(error)
            const $ = cheerio.load(body);
            const td = $('.table tr')['1'].children;
            const ctf = {
                name: $(td[0]).find('a').html(),
                date: $(td[1]).html().replace('&#x2014;', '-'),
                type: $(td[2]).html(),
                link: 'https://ctftime.org' + $(td[0]).find('a').attr('href')
            }
            resolve(ctf);
        });
    })
}
