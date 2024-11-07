//  import mongoose
const mongoose = require('mongoose')

//schema for exam results
const resultSchema = new mongoose.Schema({
    category:{
        type:String,
        require:true
    },
    results:[
        {
            score:{
                type:String,
                require:true
            },
            percentage:{
                type:String,
                require:true
            },
            passed:{
                type:Boolean,
                require:true
            }
        }
    ]
})
// schema
const userSchema = new mongoose.Schema ({
    fullname : {
        type :String,
        require:true
    },
    email :{
        type :String,
        require:true,
        unique:true
    },
    regnno :{
        type :String,
        require:true,
        unique:true
    },
    department : {
        type : String,
        require:true
    },
    yearofstudy : {
        type : String,
        require:true
    },
    username : {
        type : String,
        require:true,
        unique:true
        
    },
    password : {
        type : String,
        require:true
    },
    performance:[resultSchema]

}) 

// create model
const users = mongoose.model("users",userSchema)

// export model
module.exports = users 