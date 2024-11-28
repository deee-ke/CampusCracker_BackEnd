// import mongoose
const mongoose = require('mongoose')

// get the conncetion string

const connectionString = process.env.DATABASE

// Connect node.js/serer with mongodb
mongoose.connect(connectionString).then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log(`MongoDB Failed due to :${err}`);
})