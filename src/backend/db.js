 const mongoose = require('mongoose');
 const mongoURI = "mongodb+srv://rajatmishra0815:Project_123@cluster0.3tsmuba.mongodb.net/dataVisualisationDB?retryWrites=true&w=majority" ;


const mongoDB= async ()=>{
    try{
        // Connecting the mongoose object with the dataVisualisation dataBase from my MongoDB Atlas Cluster
            await mongoose.connect(mongoURI);
            console.log("Database connected to mongoose object!");
        // Retreiving the dataItems collection from the dataBase which is loaded with the provided JSON data
            const fecthedData= await mongoose.connection.db.collection("dataItems");
            console.log("Here!");
        // Globally declaring the fetched data 
            let arr= await fecthedData.find({}).toArray()
            global.dataArray= arr;
    }
    catch(err){
        console.log(err);
    }
};

module.exports = mongoDB;


