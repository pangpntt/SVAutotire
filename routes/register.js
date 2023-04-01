
const express = require("express")
const pool = require("../config")

router = express.Router();

router.get("/register", async function(req, res, next){
    res.render('register')
});

router.post("/register/", async function(req, res, next){
    const fname = req.body.fname;
    const lname = req.body.lname;
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;

    try{
        await pool.query(
            "INSERT INTO sys.Employees (EMP_USERNAME,EMP_PASSWORD, EMP_FNAME, EMP_LNAME, EMP_ROLE) VALUES( ?, ?, ?, ?, ?)",
            [fname, lname, username, password, role]
        )
        console.log("success")
        res.redirect('/register')
    }catch (err){
        console.log(err)
    }
})

exports.router = router;