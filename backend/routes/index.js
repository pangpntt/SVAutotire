const express = require("express")
const pool = require("../config")
const {verifyToken} = require('../middlewares/auth')
const router = express.Router();





// router.get("/", ifNotLogin, async function(req, res, next){
router.get("/", verifyToken ,async function(req, res, next){
    return res.status(201).json("Success")
})
exports.router = router;