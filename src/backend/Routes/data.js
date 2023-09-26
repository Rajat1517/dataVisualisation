const express = require("express");
const router = express.Router();

// Using express Router to make a route for fetching Data from the dataBase
router.post("/getData", (req,res)=>{
    try{
        // Allowing request to fetch data from any origin domain 
        res.set('Access-Control-Allow-Origin', '*');
        // Responding with the global dataArray initialised in db.js
        res.send([global.dataArray]);
    } catch(err){
        res.send("Error");
    }
});

module.exports = router;