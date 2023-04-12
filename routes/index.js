const express = require("express")
const pool = require("../config")


const ifNotLogin = (req, res, next) =>{
    if(!req.session.isLogin){
        return res.redirect('/login')
    }
}




router.get("/", ifNotLogin, async function(req, res, next){

    res.render('login')
})
exports.router = router;