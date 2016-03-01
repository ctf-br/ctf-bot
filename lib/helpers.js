'use strict';

const request = require('request');
const cheerio = require('cheerio');

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

module.exports = {
    upcomingCtf
}
