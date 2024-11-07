// To setup path to resolve request

// 1)import Express
const express = require('express');

// import user controller
const userController = require('../Controllers/usercontrollers')

// import general controller'
const generalController = require('../Controllers/generalController')

// import jwt Middleware
const jwtMiddleware = require('../Middlewares/jwtMiddleware')

// 2)create an object for Router() class in the express module
const router = new express.Router();

// 3)Logic
    // Syntax = router.httpreq(path,()=>{how to solve})
    
    // a)Register
    router.post('/user/register',userController.register)

    // b)Login
    router.post('/user/login',userController.login)

    //c)Admin Login
    router.post('/admin/login',userController.adminlogin)

    //d)Admin Add questions
    router.post('/general/arith/add',generalController.addQuestion)

    //e)Get general questions
    router.get('/general/:sectionName/:categoryName',generalController.getGeneralQuestions)

    //f)Edit question
    router.put('/question/edit/:id',generalController.editQuestions)

    //g)delete project
    router.delete('/question/remove/:id',generalController.deleteArithQuestions)

    //h)get all users
    router.get('/admin/allusers',userController.getAllUsers)

    //i) get general exam questions
    router.get('/general/exam/:sectionName/:categoryName',generalController.getGeneralExam)

    //j) adding exam results
    router.post('/user/results/add',jwtMiddleware,userController.addExamResults)

// 4)Export router
module.exports = router