var express = require('express');
var app = express();

var token = '1354639458:AAEZlyK3OE-siKDhkXmjFz6AKRJgNTxyQ2k';

const { Telegraf } = require('telegraf')
const bot = new Telegraf(token)
bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.command('q', (ctx) => 
	{
		try {
			var variants=['А','Б','В','Г','Д','Е'];
			var array = ctx.message.text.split(/\r?\n/);
			var javoblar ='';
			var correct_answer_index = -1;
			for(var i=2; i<array.length; i++){
				array[i]=array[i].trim()
				if(array[i].startsWith('*'))
				{
					correct_answer_index= (i-2);
					array[i]=array[i].replace('*','');
				}
				javoblar+='<b>'+variants[i-2]+') </b><i>'+array[i]+'</i>\n';
			}
			
			ctx.replyWithHTML('<b>Вопрос:</b>\n'+array[1]+'\n'+javoblar)
			setTimeout(()=>{
				ctx.replyWithQuiz(
				'Варианты:',
				variants.slice(0,array.length-2),
				{ is_anonymous: false, correct_option_id: correct_answer_index })
			}, 1000)
			
		}
		catch (e) {
		}
	}
)
bot.on('sticker', (ctx) => ctx.reply('??'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.startPolling()
bot.launch()

app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
app.get('/', function (request, response) {
    var result = 'App is running';
    bot.launch();
    response.send(result);
}).listen(app.get('port'), function () {
});



