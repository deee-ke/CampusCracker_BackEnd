// Here is the file in which we create the schema for Database (for general aptitude collection)

//import mongoose
const mongoose = require('mongoose')

//dividing schemas into seperate units

// assigning common field attributes into an object for easy reus
const structure = {
    type:String,
    required:true
}

//schema for question array
const questionSchema = mongoose.Schema({
    question:{
        ...structure
    },
    option_a:{
        ...structure
    },
    option_b:{
        ...structure
    },
    option_c:{
        ...structure
    },
    option_d:{
        ...structure
    },
    answer:{
        ...structure
    },
    explanation:{
        ...structure
    }
})

//schema for topics array
const topicSchema = mongoose.Schema({
    category:{
        ...structure
    },
    questions:[questionSchema] //calling questionSchema as value inside questions(key)
})

//schema for sections array
const sectionSchema = mongoose.Schema({
    section_name:{
        ...structure
    },
    topics:[topicSchema]
})

//general aptitude schema
const generalSchema = mongoose.Schema({
    sections:[sectionSchema]
}) 


//create model
const general_aptitudes = mongoose.model("general_aptitudes",generalSchema)

//export model
module.exports = general_aptitudes