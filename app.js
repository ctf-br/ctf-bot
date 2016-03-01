'use strict';

const irc = require('irc');
const fs = require('fs');
const watch = require('watch');
let handlers = require('./lib/handlers');

const NODE_ENV = process.env.NODE_ENV || 'development';
let config = loadEnv();

const client = new irc.Client(
    config.server,
    config.botNick,
    { channels: config.channels }
);

function loadEnv() {
    try {
        return JSON.parse(fs.readFileSync(`./config/${NODE_ENV}.json`));
    } catch (err) {
        console.error(err);
        process.exit();
    }
}

function bindListeners() {
    console.log('Listeners Binded');
    Object.keys(handlers).forEach(key => {
        client.removeAllListeners(key);
        client.addListener(key, handlers[key]);
    });
};

watch.createMonitor('./lib', (monitor) => {
    bindListeners();
    monitor.on('changed', () => reloadModuleCache());
});

function reloadModuleCache() {
    fs.readdir('./lib', (err, files) => {
        files.forEach(deleteFileCache);
        console.log('All Modules Reloaded');
        handlers = require('./lib/handlers');
        bindListeners();
    });

    function deleteFileCache(file) {
        console.log(`Delete Module Cache: ${file}`);
        delete require.cache[require.resolve(`./lib/${file}`)];
    }
}
