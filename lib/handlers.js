'use strict';

const messages = require('./messages');
const PREFIX = "$";
const botNick = "l337-bot";

const message = function(from, to, message) {
    if(from !== botNick){
        if(message && message[0] != PREFIX) return;

        const messageHandler = messages[message.substring(1)];
        if (messageHandler) {
            if (messageHandler.idle > (new Date().getTime() - messageHandler.timer)) {
                this.say(to, `To ocupado!`);
                return;
            }
            messageHandler.timer = new Date().getTime();
            messageHandler.action.apply(this, arguments);
        }
    }
}

const join = function (channel, who) {
	if(who !== botNick){
		this.send('MODE', channel, '+v', who);
    }
};

const error = function(error) {
	console.error(error);
};

// const raw = function(command) {
//     return console.log('RAW: ', command);
// };

module.exports = {message, join, error};
