const express = require('express');
const app = express();
const port = 5000;
const mongoDB = require("./db");
const https = require('https');

exports.handler = async (event, context) => {
 const url = 'https://datavisualisation.onrender.com';

 return new Promise((resolve, reject) => {
   const req = https.get(url, (res) => {
     if (res.statusCode === 200) {
       resolve({
         statusCode: 200,
         body: 'Server pinged successfully',
       });
     } else {
       reject(
         new Error(`Server ping failed with status code: ${res.statusCode}`)
       );
     }
   });

   req.on('error', (error) => {
     reject(error);
   });

   req.end();
 });
};

mongoDB();

app.get('/', (req, res) => {
  res.send('Server is Working!')
});

// Using the End Point "/api/getData" to fetch the data
app.use("/api", require("./Routes/data"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
