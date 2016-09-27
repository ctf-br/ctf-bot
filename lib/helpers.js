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

function ranking() {
    return new Promise((resolve, reject) => {
        request('https://ctf.tecland.com.br/ranking/game/scoreboard/table/', (error, response, body) => {
            if(error) reject(error)
            const $ = cheerio.load(body);
            const rank = {};
            $('dd').each(function(i, elem){
                rank[i] = {
                    'name': $(this).find('td').eq(1).text(),
                    'position': $(this).find('td').eq(3).text(),
                    'points': $(this).find('td').eq(5).text(),
                    'challs': $(this).find('td').eq(9).text()
                };
            });
            resolve(rank);
        });
    })
}

module.exports = {
    upcomingCtf,
    ranking
}
