'use strict';

const helper = require('./helpers');
const messagesListner = {};

function respondMessage(message, idle, action) {
    messagesListner[message] = {idle, action};
}

respondMessage('nextctf', 10000, function(from, to, message) {
    helper.upcomingCtf()
        .then(ctf => {
            this.say(to, `Nome: ${ctf.name}`);
            this.say(to, `Data: ${ctf.date}`);
            this.say(to, `Tipo: ${ctf.type}`);
            this.say(to, `Site: ${ctf.link}`);
        })
        .catch(err => {
            console.error(err);
            this.say(to, `Houston we have a problem! Try later ${from}`);
        });
});

respondMessage('masters', 0, function(from, to, message) {
    this.say(to, `v3ntur4++ hackaponey++`);
});

module.exports = messagesListner;
