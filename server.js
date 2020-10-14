var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
app.get('/', function (request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function () {
    console.log('App is running, server is listening on port ', app.get('port'));
});
var token = '1354639458:AAEZlyK3OE-siKDhkXmjFz6AKRJgNTxyQ2k';

const { Telegraf } = require('telegraf')

const bot = new Telegraf(token)
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('??'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.startPolling(1,2)
bot.launch()

