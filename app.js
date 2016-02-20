'use strict';

const irc = require('irc');
const request = require('request');
const cheerio = require('cheerio');

const client = new irc.Client(
    'rajaniemi.freenode.net',
    'ctfbot',
    { channels: ['#ctf-br'] }
);

//Give voice for new members join when they join
client.addListener('join', function(channel, who){
	if(who !== 'ctfbot'){
		client.send('MODE', channel, '+v', who);
	}
});

const messagesListner = {};

//Generic message handler
function respondMessage(message, idle, action) {
    messagesListner[message] = {idle, action};
}

//Magic happens here
client.addListener('message', function (from, to, message) {
    if (messagesListner[message]) {
        const msg = messagesListner[message];
        if (msg.idle > (new Date().getTime() - msg.timer)) {
            client.say('#ctf-br', `To ocupado!!!`);
            return;
        }
        msg.timer = new Date().getTime();
        msg.action();
    }
});

//Message handlers
respondMessage('!nextctf', 10000, () => {
    upcomingCtf()
        .then(ctf => {
            client.say('#ctf-br', `Nome: ${ctf.name}`)
            client.say('#ctf-br', `Data: ${ctf.date}`)
            client.say('#ctf-br', `Tipo: ${ctf.type}`)
            client.say('#ctf-br', `Site: ${ctf.link}`)
        })
        .catch(err => {
            client.say('#ctf-br', `${err}`);
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
