const express = require('express');
const app = express();
const port = 5000;
const {mongoDB} = require("./db");
const cron = require('cron');
const https = require("https");

let  data=[];
const asyncMongo= async ()=>{
    data= await mongoDB();
}

asyncMongo();

app.get('/', (req, res) => {
  res.send('Server is Working!')
});

// Using the End Point "/api/getData" to fetch the data
app.use("/api", require("./Routes/data"));

// Endpoint for time series data
app.get("/api/getTime-Series", (req,res)=>{
    let years= new Set(data.map((item)=>{
        if(item.topic==="gas"){
            if(item.published!==""){
                const year= new Date(item.published).getFullYear();
                return year;
            }
            else if(item.added!==""){
                const year= new Date(item.added).getFullYear();
                return year;
            }
            else if(item.end_year!=="") return parseInt(item.end_year);
            else if(item.start_year!=="") return parseInt(item.start_year);
            return 2022;
        }
        else return "non-gas";
    }));
    years= [...years];
    years= years.filter(year=>typeof year === "number");
    years.sort((a,b)=>a-b);

    let ans= years.map(year=> ({
        year,
        count: 0,
    }));
    data.forEach(item=>{
        if(item.topic==="gas"){
            let time;
            if(item.published!=="")
                time= new Date(item.published).getFullYear();
            else if(item.added!=="")
                time= new Date(item.added).getFullYear();
            else if(item.end_year!=="")time= parseInt(item.end_year);
            else if(item.start_year!=="")time= parseInt(item.start_year);
            else time= 2022;
            ans= ans.map((item)=>{
                if(item.year===time){
                    return {
                        ...item,
                        count: item.count+1,
                    }
                }
                return item;
            })
        }
    })
    res.set('Access-Control-Allow-Origin', '*');
    res.send({
        data: ans
    });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});



// cron job for restarting render server

const backendUrl = "https://datavisualisation-va1q.onrender.com";  //https://datavisualisation.onrender.com

// const job = new cron.CronJob("*/11 * * * *", function(){
//     https.get(backendUrl, (res)=>{
//         if(res.statusCode === 200){
//             console.log("server restarted!");
//         }
//         else{
//             console.error("failed to restart",res.statusCode);
//         }
//     }).on('error', (err)=>{
//         console.error(err.message);
//     });
// });


// job.start();




