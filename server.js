
var token = '1354639458:AAEZlyK3OE-siKDhkXmjFz6AKRJgNTxyQ2k';

const { Telegraf } = require('telegraf')

const bot = new Telegraf(token)
bot.command('oldschool', (ctx) => ctx.reply('Hello'))
bot.command('modern', ({ reply }) => reply('Yo'))
bot.command('hipster', Telegraf.reply('λ'))
bot.launch()

