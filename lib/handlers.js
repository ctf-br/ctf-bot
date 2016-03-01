'use strict';

const messages = require('./messages');
const PREFIX = "$";

const message = function(from, to, message) {
    if(message && message[0] != PREFIX) return;

    const messageHandler = messages[message.substring(1)];
    if (messageHandler) {
        if (messageHandler.idle > (new Date().getTime() - messageHandler.timer)) {
            this.say('#ctf-bot-test', `To ocupado!`);
            return;
        }
        messageHandler.timer = new Date().getTime();
        messageHandler.action.apply(this, arguments);
    }
}

const join = function (channel, who) {
	if(who !== 'ctfbot'){
		this.send('MODE', channel, '+v', who);
	}
};

const error = function(error) {
	console.error(error);
};

module.exports = {message, join, error};
