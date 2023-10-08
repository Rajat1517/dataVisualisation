const express = require('express');
const app = express();
const port = 5000;
const mongoDB = require("./db");
const cron = require('cron');
const https = require("https");


mongoDB();

app.get('/', (req, res) => {
  res.send('Server is Working!')
});

// Using the End Point "/api/getData" to fetch the data
app.use("/api", require("./Routes/data"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

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


job.start();




