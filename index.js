const Telegraf = require('telegraf')

const bot = new Telegraf('1547617487:AAFd7SY_CnefKeC5DJ_sqI9LX0xCUNvt0O8')


bot.start(ctx => {
    ctx.reply('Welcome to ChopeNUS! Which type of facility do you want to book?');
})

bot.launch()
