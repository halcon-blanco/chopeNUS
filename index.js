const {
    Telegraf,
    Markup
} = require('telegraf')

//web links

const SPORTS = "https://reboks.nus.edu.sg/nus_public_web/public/"
const UTOWN = "https://uci.nus.edu.sg/suu/facilities-booking/facilities-booking-utown-non-residential-facilities/"
const LIBRARIES = "https://libportal.nus.edu.sg/frontend/web/bookdiscussionroom"
const WEB_VPN = "https://webvpn.nus.edu.sg/dana-na/auth/url_default/welcome.cgi"
// can use for web-scraping for schedule later as an e.g. (computing facilities)
const COM_SCHEDULE = "https://mysoc.nus.edu.sg/~calendar/getBooking.cgi?"

const bot = new Telegraf('1547617487:AAFd7SY_CnefKeC5DJ_sqI9LX0xCUNvt0O8')


bot.start(ctx => {
    ctx.reply('');

    const buttons = Markup.inlineKeyboard([
        [Markup.callbackButton('FOE', 'foe'), Markup.callbackButton('Music', 'music'), Markup.callbackButton('Medicine', 'med'), Markup.callbackButton('YIH', 'yih')],
        [Markup.callbackButton('UTown', 'utown'), Markup.callbackButton('FOE', 'foe'), Markup.callbackButton('FASS', 'fass'), Markup.callbackButton('SOC', 'soc')],
        [Markup.callbackButton('FOS', 'fos'), Markup.callbackButton('SDE', 'sde'), Markup.callbackButton('Law', 'law')]
    ]);

    ctx.telegram.sendMessage(ctx.chat.id, "Welcome to ChopeNUS! Which type of facility do you want to book?", {
        reply_markup: buttons
    })


});

bot.on('callback_query', ctx => {
    ctx.reply("it works! Now lets get started lol");

    ctx.answerCbQuery()
})

bot.launch()
