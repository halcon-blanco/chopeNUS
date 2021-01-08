const {
    Telegraf,
    Markup
} = require('telegraf')

const bot = new Telegraf('1547617487:AAFd7SY_CnefKeC5DJ_sqI9LX0xCUNvt0O8')


bot.start(ctx => {
    ctx.reply('Welcome to ChopeNUS! Which type of facility do you want to book?');

    const buttons = Markup.inlineKeyboard([
        [Markup.callbackButton('Test', 'test')],
        [Markup.callbackButton('Test 2', 'test2')]
    ]);

    ctx.telegram.sendMessage(ctx.chat.id, "test", {
        reply_markup: buttons
    })


});

bot.on('callback_query', ctx => {
    ctx.reply("test");

    ctx.answerCbQuery()
})

bot.launch()
