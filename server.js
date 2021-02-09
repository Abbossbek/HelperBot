var express = require('express');
var app = express();

var token = '1354639458:AAEZlyK3OE-siKDhkXmjFz6AKRJgNTxyQ2k';

const { Telegraf } = require('telegraf')
//[ctx.message.text.split(/\r?\n/)[2], ctx.message.text.split(/\r?\n/)[3], ctx.message.text.split(/\r?\n/)[4], ctx.message.text.split(/\r?\n/)[5]]
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
  			console.log("entering catch block");
 			console.log(e);
  			console.log("leaving catch block");
		}
	}
)

app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
app.get('/', function (request, response) {
    var result = 'App is running'
    
    response.send(result);
}).listen(app.get('port'), function () {
    console.log('App is running, server is listening on port ', app.get('port'));
});

 app.get('/task', function (request, response) {
  	const fs = require('fs')
fs.readFile('./channels.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }
	
    response.send(jsonString);
    console.log('File data:', jsonString) 
})
})

bot.on('sticker', (ctx) => ctx.reply('??'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.startPolling()
bot.launch()
