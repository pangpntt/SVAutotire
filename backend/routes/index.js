const express = require("express")
const pool = require("../config")
const {verifyToken} = require('../middlewares/auth')
const router = express.Router();





// router.get("/", ifNotLogin, async function(req, res, next){
router.get("/", verifyToken ,async function(req, res, next){
    try{
        res.status(201).json("Success")
    }catch(err){
        console.log(err)
    }

})
exports.router = router;