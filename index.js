const {
    Telegraf,
    Markup
} = require('telegraf')
const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./database');
//middleware
app.use(cors());
app.use(express.json()); //req.body
app.listen(5000, ()=>{
    console.log("connected on port 5000");
});

app.get("/test", async(req,res)=>{
    try {
        const allEntries = await pool.query("SELECT * FROM bookings");
        res.json(allEntries.rows);
    } catch (error) {
        console.error(error);
    }
});

const open = require('open')

const API_TOKEN = '1547617487:AAFd7SY_CnefKeC5DJ_sqI9LX0xCUNvt0O8'

//web links
const SPORTS_URL = "https://reboks.nus.edu.sg/nus_public_web/public/"
const UTOWN_URL = "https://uci.nus.edu.sg/suu/facilities-booking/facilities-booking-utown-non-residential-facilities/"
const LIBRARIES_URL = "https://aces.nus.edu.sg/fbs/ADFSLogin"
const WEB_VPN = "https://webvpn.nus.edu.sg/dana-na/auth/url_default/welcome.cgi"
// can use for web-scraping for schedule later as an e.g. (computing facilities)
const COM_SCHEDULE = "https://mysoc.nus.edu.sg/~calendar/getBooking.cgi?"

const STUDY_BUTTON_NAME = "study"

const bot = new Telegraf(API_TOKEN)


bot.start(ctx => {
    ctx.telegram.sendMessage(ctx.chat.id, "Welcome to ChopeNUS! Which type of facility do you want to book?", {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [
                    { text: 'Study', callback_data: STUDY_BUTTON_NAME },
                    // {text: 'Libraries', url: LIBRARIES_URL},
                    { text: 'Sports', url: SPORTS_URL}
                ]
            ]
        })
    });

});

bot.on('callback_query', ctx => {
    if (ctx.callbackQuery.data === STUDY_BUTTON_NAME) {
        handleStudyButton(ctx)
    }
    // } else if (ctx.callbackQuery.data === SPORTS_BUTTON_NAME) {
    //     handleSportsButton()
    // } else if (ctx.callbackQuery.data === STUDY_ROOMS_BUTTON_NAME) {
    //     handleStudyRoomsButton()
    // } else if (ctx.callbackQuery.data === UTOWN_BUTTON_NAME) {
    //     handleUtownButton()
    // }

    ctx.answerCbQuery()
});

function handleStudyButton(ctx) {

    study_buttons = {
        inline_keyboard: [
            [
                { text: 'Study Rooms', url: LIBRARIES_URL},
                { text: 'UTown', url: UTOWN_URL}
            ]
        ]
    };

    ctx.telegram.sendMessage(ctx.chat.id, "Where do you want to study?", {
        reply_markup: JSON.stringify(study_buttons)
    });
}



bot.launch()
