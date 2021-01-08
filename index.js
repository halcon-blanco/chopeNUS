const Telegraf = require('telegraf')

const open = require('open')

const facData = require('./faculties.json')

const FACULTIES = facData["faculties"]

const API_TOKEN = '1547617487:AAFd7SY_CnefKeC5DJ_sqI9LX0xCUNvt0O8'

//web links
const SPORTS_URL = "https://reboks.nus.edu.sg/nus_public_web/public/"
const UTOWN_URL = "https://uci.nus.edu.sg/suu/facilities-booking/facilities-booking-utown-non-residential-facilities/"
const LIBRARIES_URL = "https://aces.nus.edu.sg/fbs/ADFSLogin"
const WEB_VPN = "https://webvpn.nus.edu.sg/dana-na/auth/url_default/welcome.cgi"
// can use for web-scraping for schedule later as an e.g. (computing facilities)
const COM_SCHEDULE = "https://mysoc.nus.edu.sg/~calendar/getBooking.cgi?"

const STUDY_BUTTON_NAME = "study"
const FACULTY_IDENTIFIER = "faculty"

const WELCOME_MESSAGE = "Welcome to ChopeNUS! Which type of facility do you want to book?\n\n" +
    "Rememeber to be logged in to NUS WiFi or use NUS VPN: " + WEB_VPN

const bot = new Telegraf(API_TOKEN)

let messagePromise; // represents message sent on location_info command


bot.start(ctx => {

    ctx.telegram.sendMessage(ctx.chat.id, WELCOME_MESSAGE, {
        disable_web_page_preview: true,
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{
                        text: 'Study',
                        callback_data: STUDY_BUTTON_NAME
                    },
                    {
                        text: 'Sports',
                        url: SPORTS_URL
                    }
                ]
            ]
        })
    });

});

bot.on('callback_query', async ctx => {
    if (ctx.callbackQuery.data === STUDY_BUTTON_NAME) {
        handleStudyButton(ctx)
    } else if (ctx.callbackQuery.data.startsWith(FACULTY_IDENTIFIER)) {

        message = await messagePromise

        fac = ctx.callbackQuery.data.slice(FACULTY_IDENTIFIER.length).trim()

        newButtons = {
            inline_keyboard: facData[fac]
        }

        console.log(newButtons);

        ctx.telegram.sendMessage(ctx.chat.id, "Which facility?", {
            reply_markup: JSON.stringify(newButtons)
        })





        // newReplyMarkup = {
        //     inline_keyboard: [
        //         [{
        //             text: "sth",
        //             callback_data: "sth"
        //         }]
        //     ]
        // }
        //
        // newMessage = await ctx.telegram.editMessageReplyMarkup(chatId = ctx.chat.id, messageId = message.message_id, markup=JSON.stringify(newReplyMarkup))
    }

    ctx.answerCbQuery()

    console.log("heyy");
});

bot.command('locationinfo', ctx => {

    messagePromise = ctx.telegram.sendMessage(ctx.chat.id, "Which faculty is it in?", {
        reply_markup: JSON.stringify({
            inline_keyboard: FACULTIES
        })
    })

})

function handleStudyButton(ctx) {

    study_buttons = {
        inline_keyboard: [
            [{
                    text: 'Study Rooms',
                    url: LIBRARIES_URL
                },
                {
                    text: 'UTown',
                    url: UTOWN_URL
                }
            ]
        ]
    };


    ctx.telegram.sendMessage(ctx.chat.id, "Where do you want to study?", {
        reply_markup: JSON.stringify(study_buttons)
    });
}



bot.launch()
