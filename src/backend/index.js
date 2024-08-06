const express = require('express');
const app = express();
const port = 5000;
const {mongoDB} = require("./db");
const cron = require('cron');
const https = require("https");

let  data;

const asyncMongo= async ()=>{
    data= await mongoDB();
}

const countryCoordinates = {
    "United States of America": [37.0902, -95.7129],
    "Mexico": [23.6345, -102.5528],
    "Nigeria": [9.082, 8.6753],
    "Lebanon": [33.8547, 35.8623],
    "Russia": [61.524, 105.3188],
    "Saudi Arabia": [23.8859, 45.0792],
    "Angola": [-11.2027, 17.8739],
    "Egypt": [26.8206, 30.8025],
    "South Africa": [-30.5595, 22.9375],
    "India": [20.5937, 78.9629],
    "Ukraine": [48.3794, 31.1656],
    "Azerbaijan": [40.1431, 47.5769],
    "China": [35.8617, 104.1954],
    "Colombia": [4.5709, -74.2973],
    "Niger": [17.6078, 8.0817],
    "Libya": [26.3351, 17.2283],
    "Brazil": [-14.235, -51.9253],
    "Mali": [17.5707, -3.9962],
    "Indonesia": [-0.7893, 113.9213],
    "Iraq": [33.2232, 43.6793],
    "Iran": [32.4279, 53.688],
    "South Sudan": [7.8627, 29.6949],
    "Venezuela": [6.4238, -66.5897],
    "Burkina Faso": [12.2383, -1.5616],
    "Germany": [51.1657, 10.4515],
    "United Kingdom": [55.3781, -3.436],
    "Kuwait": [29.3117, 47.4818],
    "Canada": [56.1304, -106.3468],
    "Argentina": [-38.4161, -63.6167],
    "Japan": [36.2048, 138.2529],
    "Austria": [47.5162, 14.5501],
    "Spain": [40.4637, -3.7492],
    "Estonia": [58.5953, 25.0136],
    "Hungary": [47.1625, 19.5033],
    "Australia": [-25.2744, 133.7751],
    "Morocco": [31.7917, -7.0926],
    "Greece": [39.0742, 21.8243],
    "Qatar": [25.3548, 51.1839],
    "Oman": [21.4735, 55.9754],
    "Liberia": [6.4281, -9.4295],
    "Denmark": [56.2639, 9.5018],
    "Malaysia": [4.2105, 101.9758],
    "Jordan": [30.5852, 36.2384],
    "Syria": [34.8021, 38.9968],
    "Ethiopia": [9.145, 40.4897],
    "Norway": [60.472, 8.4689],
    "Ghana": [7.9465, -1.0232],
    "Kazakhstan": [48.0196, 66.9237],
    "Pakistan": [30.3753, 69.3451],
    "Gabon": [-0.8037, 11.6094],
    "United Arab Emirates": [23.4241, 53.8478],
    "Algeria": [28.0339, 1.6596],
    "Turkey": [38.9637, 35.2433],
    "Cyprus": [35.1264, 33.4299],
    "Belize": [17.1899, -88.4976],
    "Poland": [51.9194, 19.1451]
    // Add more countries as needed
};

asyncMongo();

const findCountries= ()=>{
    let countries= new Set(data.map(item=>item.country));
    let obj=[],count=0;
    countries=[...countries];
    countries= countries.filter(country=> country!=="");
    countries.forEach(country=>{
        count=0;
        data.forEach(item=>{
            if(item.country===country)count++;
        })
        // obj.push([...countryCoordinates[country],count*100])
        obj.push({
            country,
            count: count*50
        })
    })
    return obj;
}

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


// Endpoint for sector bars data
app.get("/api/getSector-Bars",(req,res)=>{
    let sectors= new Set(data.map(item=>item.sector));
    sectors= [...sectors];
    sectors= sectors.filter(sector=> sector!=="");
    let ans=[];
    let count=0,countOthers=1000;
    sectors.forEach(sector=>{
        count=0;
        data.forEach(item=>{
            if(item.sector===sector)count++;
        })
        ans.push({
            sector,
            count,
        })
        countOthers-=count;
    })
    ans.push({
        sector: "Others",
        count: countOthers,
    })
    res.set('Access-Control-Allow-Origin', '*');
    res.send({
        data: ans
    });
});

// Endpoint for region bubbles data
app.get("/api/get-region-bubbles",(req,res)=>{
    let regions= new Set(data.map(item=>item.region.toLowerCase()));
    regions= [...regions];
    regions= regions.filter(region=>region!=="");
    regions= regions.map((region)=>{
        let ans=region[0].toUpperCase();
        for(let i=1;i<region.length;i++){
            if(region[i-1]===" "){
                ans+= region[i].toUpperCase();
            }
            else ans+= region[i];
        }
        return ans;
    });

    let response=[];
    let count,intensity,relevance,likelihood;
    regions.forEach(region=>{
        count=0;intensity=0;relevance=0;likelihood=0;
        data.forEach(item=>{
            if(item.region.toLowerCase()===region.toLowerCase()){
                count++;
                intensity+= typeof item.intensity === "number"?item.intensity:0;
                relevance+= typeof item.relevance === "number"? item.relevance:0;
                likelihood+= typeof item.likelihood === "number"? item.likelihood:0;
            }
        })
        response.push({
            region,
            likelihood: ~~(likelihood/count),
            relevance: ~~(relevance/count),
            intensity: ~~(intensity/count),
        })
    })
    res.set('Access-Control-Allow-Origin', '*')
    res.send(response);
});

// Endpoint for country doughnut data
app.get("/api/get-countries-doughnut", (req,res)=>{
    let countries= new Set(data.map(item=> item.country));
    countries= [...countries];
    countries= countries.filter(country=> country !== "");
    let ans=[],count=0;
    countries.forEach(country=>{
        count=0;
        data.forEach(item=>{
            if(item.country===country)count++;
        })
        ans.push({
            country,
            count,
        })
    })
    count=0;
    ans.forEach((item)=>{
        if(item.count<15)count+=item.count;
    })

    ans= ans.filter(item=>{
        return item.count>=15;
    })
    ans.push({
        country: "Others",
        count,
    })
    ans= ans.sort((a,b)=> a.count-b.count);
    res.set("Access-Control-Allow-Origin","*");
    res.send(ans);
})

// Endpoint for geo heat map
app.get("/api/get-heat-map", (req,res)=>{
    const ans= findCountries();
    res.set("Access-Control-Allow-Origin","*");
    res.send(ans);
})


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});



// cron job for restarting render server

// const backendUrl = "https://datavisualisation-va1q.onrender.com";  //https://datavisualisation.onrender.com

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




