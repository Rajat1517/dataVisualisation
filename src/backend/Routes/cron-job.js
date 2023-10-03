const cron = require('cron');
const https = require("https");

const backendUrl = "https://datavisualisation.onrender.com";

const job = new cron.CronJob("*/14 * * * *", function(){
    https.get(backendUrl, (res)=>{
        if(res.statusCode === 200){
            console.log("server restarted!");
        }
        else{
            console.erro("failed to restart");
        }
    }).on('error', (err)=>{
        console.error(err.message);
    });
});


module.exports = {
    job
};