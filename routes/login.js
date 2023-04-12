const express = require("express")
const pool = require("../config")
const bcrypt = require('bcrypt');
router = express.Router();
const { body, validationResult } = require('express-validator');

const ifLogin = (req, res, next) =>{
    if(req.session.isLogin){
        return res.redirect('/')
    }
    next();
}
const ifNotLogin = (req, res, next) =>{
    if(!req.session.isLogin){
        return res.render('/login')
    }
}

router.get("/login", async function(req, res, next){
    res.render('/login')
});

exports.router = router