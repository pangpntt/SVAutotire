const express = require("express")
const pool = require("../config")

router = express.Router();

router.get("/login", async function(req, res, next){
    res.render('login')
});

exports.router = router