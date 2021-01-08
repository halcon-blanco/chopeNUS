const Telegraf = require('telegraf');
const pool = require('./database');
require('dotenv').config();

const facData = require('./faculties.json')

const FACULTIES = facData["faculties"]
const API_TOKEN = process.env.API_TOKEN;
console.log(API_TOKEN);
//web links
const SPORTS_URL = "https://reboks.nus.edu.sg/nus_public_web/public/"
const UTOWN_URL = "https://uci.nus.edu.sg/suu/facilities-booking/facilities-booking-utown-non-residential-facilities/"
const LIBRARIES_URL = "https://aces.nus.edu.sg/fbs/ADFSLogin"
const WEB_VPN = "https://webvpn.nus.edu.sg/dana-na/auth/url_default/welcome.cgi"
// can use for web-scraping for schedule later as an e.g. (computing facilities)
const COM_SCHEDULE = "https://mysoc.nus.edu.sg/~calendar/getBooking.cgi?"

const STUDY_BUTTON_NAME = "study"
const FACULTY_IDENTIFIER = "faculty"
const CLUSTER_IDENTIFIER = "cluster"

const WELCOME_MESSAGE = "Welcome to ChopeNUS! Which type of facility do you want to book?\n\n" +
    "Rememeber to be logged in to NUS WiFi or use NUS VPN: " + WEB_VPN

const bot = new Telegraf(API_TOKEN)

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

        fac = ctx.callbackQuery.data.slice(FACULTY_IDENTIFIER.length).trim()

        let message = "No facilities here :(";
        let newButtons;

        if (facData[fac] !== undefined) {
            message = "Which facility?"
            newButtons = {
                    inline_keyboard: facData[fac]
            }
        }

        ctx.telegram.sendMessage(ctx.chat.id, message, {
            reply_markup: JSON.stringify(newButtons)
        })
    } else if (ctx.callbackQuery.data.startsWith(CLUSTER_IDENTIFIER)) {

        data = ctx.callbackQuery.data.slice(CLUSTER_IDENTIFIER.length).trim().split(" ");
        console.log(data);
        cluster = data[0]
        fac = data[1]

        topDays = await get_location_data(fac, cluster)

        let message = fac + ", " + cluster + ": Most busy slots in the past month are\n\n";

        for (let topDay of topDays) {
            let fullDate = new Date(Date.parse(topDay.start_time))

            let date = fullDate.toDateString();
            let time = fullDate.toLocaleTimeString()

            message += date + " " + time + "\n"
        }

        ctx.reply(message)

    }

    ctx.answerCbQuery()
});

bot.command('locationinfo', ctx => {

    messagePromise = ctx.telegram.sendMessage(ctx.chat.id, "Which faculty is it in?", {
        reply_markup: JSON.stringify({
            inline_keyboard: FACULTIES
        })
    })

})


// TODO:

bot.command('suggestedbookings', ctx => {
    user_id = ctx.from.id;

    // 1. check if the user_id is contained in the users database.
    //      (a) if yes, then display the top 3 locations in the user's booking
    //      (b) otherwise step 2
    // 2. generate 3 random locations and time slots
    // 3. add those time slots to the database for the user under user_id
    // 4. display them
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

async function get_location_data(fac, location_name){
    let data = '';
    // if(typeof(room) === 'undefined'){
    //     room = 'NULL';
    // }
    let query = new Promise(async (resolve, reject) => {
        await pool.query(`SELECT fac_name,loc_name,start_time, end_time, COUNT(*) AS book_count
        FROM bookings 
        where fac_name = $1 and loc_name = $2 
        GROUP BY fac_name, loc_name, start_time, end_time
        ORDER BY book_count DESC
        LIMIT 3;`, [fac, location_name], (error,response)=>{
            if(error){
                console.log("error in get_location method");
                console.log(error.message);
            }
            else{
                // console.log(response.rows);
                data = (response.rows);
            }
            resolve();
        })
    })

    await query
    return Promise.resolve(data);
}
// get_location_data('UTown', 'pccommons').then((val)=>console.log(val));

// async function get_individual_data(id){
//     let data = '';
//     let query = new Promise(async (resolve, reject) =>{
//         await pool.query('SELECT * FROM bookings WHERE chopeid = $1 ORDER BY book_time LIMIT 3', [id], (error, response)=>{
//             if(error){
//                 console.log("error");
//             }
//             else{
//                 data = response.rows; 
//             }
//             resolve();
//         })
//     })
//     await query;
//     return Promise.resolve(data);
// }

// get_individual_data('1234567').then(x=>console.log(x));

bot.launch()
