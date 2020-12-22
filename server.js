var express = require('express');
var app = express();

var token = '1354639458:AAEZlyK3OE-siKDhkXmjFz6AKRJgNTxyQ2k';

const { Telegraf } = require('telegraf')

const bot = new Telegraf(token)
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.command('quiz', (ctx) => 
	{
		try {
			var array = ctx.message.text.split(/\r?\n/);
			var correct_answer_index = -1;
			for(var i=2; i<array.length; i++){
				if(array[i].startsWith('*'))
					correct_answer_index= (i-2);
			}
			ctx.replyWithMarkdown('')
			ctx.replyWithQuiz(
			ctx.message.text.split(/\r?\n/)[1],
			[ctx.message.text.split(/\r?\n/)[2], ctx.message.text.split(/\r?\n/)[3], ctx.message.text.split(/\r?\n/)[4], ctx.message.text.split(/\r?\n/)[5]],
			{ is_anonymous: false, correct_option_id: correct_answer_index })
		}
		catch (e) {
  			console.log("entering catch block");
 			console.log(e);
  			console.log("leaving catch block");
		}
	}
)
bot
  .launch()
  .then(() => console.log("Bot Started!"))
bot.on('sticker', (ctx) => ctx.reply('??'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.startPolling()
bot.launch()
app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
app.get('/', function (request, response) {
    var result = 'App is running'
    bot.launch()
    response.send(result);
}).listen(app.get('port'), function () {
    console.log('App is running, server is listening on port ', app.get('port'));
});

