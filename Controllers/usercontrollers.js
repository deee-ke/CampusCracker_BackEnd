// Logic to resolve the request
// import model
const { JsonWebTokenError } = require('jsonwebtoken');
const users = require('../Models/userSchema');

// import jwt
const jwt = require('jsonwebtoken');

// logic for register
exports.register = async(req,res)=>{
    console.log(`inside controller register function`);
    // extract data from request body-json() in index.js file converts json data into javascript object
    const {fullname,email,regnno,department,yearofstudy,username,password}=req.body;
       try{const existUser = await users.findOne({email})

        if(existUser){
            res.status(406).json("Email already exists....please Login")
        }
        else{
            // create an object from the model
            const newUser = new users({
                fullname,
                email,
                regnno,
                department,
                yearofstudy,
                username,
                password
            })
            // save the function in mongoose - to permanently store this data in mongodb
           await newUser.save() 
    //response
    res.status(200).json(newUser)
        }}
        catch(err){
            res.status(500).json(`Register request failed due to ${err}`);
        }
}

//logic for login
exports.login = async(req,res)=>{
    console.log('Inside controller login function.');
    const {email,password} = req.body
   try{ const existingUser = await users.findOne({email,password})
    console.log(existingUser);

    if(existingUser){

        const token =jwt.sign({ userId:existingUser._id},"campussecretkey1234") /* First argument is the data that is send inside the token and the second argument is the key based on which the token is generated  */

        res.status(200).json({
            existingUser,
            token
        })
    }
    else{
        res.status(406).json('Incorrect email or password!')
    }}catch(err){
        res.status(401).json(`Login failed due to ${err}`)
    }
    
}

//logic for Admin Login
exports.adminlogin = async(req,res)=>{
    console.log('Inside controller adminlogin function.');
    const {username,password} = req.body
    try{const admin = await users.findOne({username,password})
    console.log(admin);

    if(admin){
        const token = jwt.sign({userId:admin._id},"campussecretkey1234")

        res.status(200).json({
            admin,
            token
        })   
    }
    else{
        res.status(406).json('Incorrect Username or Password!')
    }}catch(err){
        res.status(401).json(`Admin Login failed due to ${err}`)
    }
    
}

//logic for getting users for Admin
exports.getAllUsers = async(req,res)=>{
    try {
        const vUsers = await users.find()
        res.status(200).json(vUsers)        
    } catch (error) {
        res.status(401).json(`Request failed due to ${error}`)
    }
}

//logic for adding exam results
exports.addExamResults = async(req,res) =>{
    const userId = req.payload
    console.log(userId);
    
    const {examResult,category} = req.body
    
    console.log(req.body);
    
    try {
        const existingUser = await users.findOne({_id:userId})
       
        if(existingUser){
            const newResult = {
                category,
                results:[{
                    score:examResult.score,
                    percentage:examResult.percentage,
                    passed:examResult.passed
                }]
            }
            await users.updateOne({_id:userId},{$push:{performance:newResult}})
            res.status(200).json(newResult)
        }else{
            res.status(404).json('User not found')
        }
    } catch (error) {
        res.status(500).json(`Request failed due to ${error}`)
    }
}