const {
    Telegraf,
    Markup
} = require('telegraf')

const bot = new Telegraf('1547617487:AAFd7SY_CnefKeC5DJ_sqI9LX0xCUNvt0O8')


bot.start(ctx => {
    ctx.reply('Welcome to ChopeNUS! Which type of facility do you want to book?');

    const buttons = Markup.inlineKeyboard([
        [Markup.callbackButton('FOE', 'foe')],
        [Markup.callbackButton('Music', 'music')],
        [Markup.callbackButton('Medicine', 'med')],
        [Markup.callbackButton('YIH', 'yih')],
        [Markup.callbackButton('UTown', 'utown')],
        [Markup.callbackButton('FOE', 'foe')],
        [Markup.callbackButton('FASS', 'fass')],
        [Markup.callbackButton('SOC', 'soc')],
        [Markup.callbackButton('FOS', 'fos')],
        [Markup.callbackButton('SDE', 'sde')],
        [Markup.callbackButton('Law', 'law')],
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
