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

respondMessage('rank', 10000, function(from, to, message){
    helper.ranking()
        .then(rank => {
            for(let i = 0; i < 5; i++){
                this.say(to, `${rank[i].position} ${rank[i].name}`);
            }
        })
        .catch(err => {
            console.error(err);
            this.say(to, `Houston we have a problem! Try later ${from}`);
        });
});

respondMessage('allrank', 10000, function(from, to, message){
    helper.ranking()
        .then(rank => {
            let text = '';
            for(let i in rank){
                text += rank[i].position + ' ' + rank[i].name + ' ';
            }
            this.say(to, text);
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
