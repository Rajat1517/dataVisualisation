const express = require('express');
const app = express();
const port = 5000;
const mongoDB = require("./db");
const job = require ("./Routes/cron-job")
mongoDB();

job.start();

app.get('/', (req, res) => {
  res.send('Server is Working!')
});

// Using the End Point "/api/getData" to fetch the data
app.use("/api", require("./Routes/data"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});




