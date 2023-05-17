const express = require("express")
const pool = require("../config")
const bcrypt = require('bcrypt');

router = express.Router();
const { body, validationResult } = require('express-validator');

// const ifLogin = (req, res, next) =>{
//     if(req.session.isLogin){
//         return res.redirect('/')
//     }
//     next();
// }
// const ifNotLogin = (req, res, next) =>{
//     if(!req.session.isLogin){
//         return res.render('/login.ejs')
//     }
// }

router.get("/login", async function(req, res, next){
    console.log('good')
});

exports.router = router