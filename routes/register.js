
const express = require("express");
const pool = require("../config");

const bcrypt = require('bcrypt');
router = express.Router();
const { body, validationResult } = require('express-validator');

router.get("/register", async function(req, res, next){
    res.render('register')
});


router.post("/register/", [
    body('username').custom(value =>{
        return pool.query('SELECT EMP_USERNAME FROM sys.Employees WHERE EMP_USERNAME = ?', [value])
        .then(([rows]) =>{
            if(rows.length > 0){
                return Promise.reject('Username นี้มีอยู่แล้วในระบบ')

            }
            return true;
        })
    })
],async function(req, res, next){
    const validation_result = validationResult(req);
    const fname = req.body.fname;
    const lname = req.body.lname;
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;
    if(validation_result.isEmpty()){
        try{
            let hashPassword = await bcrypt.hash(password, 8)
            await pool.query(
                "INSERT INTO sys.Employees (EMP_USERNAME,EMP_PASSWORD, EMP_FNAME, EMP_LNAME, EMP_ROLE) VALUES( ?, ?, ?, ?, ?)",
                [fname, lname, username, hashPassword, role]
            )

        }catch (err){
            throw err;
        }
    }else{
        let allErrors = validation_result.errors.map((error) =>{
            return error.msg
        })

        res.render('register', {
            register_error: allErrors,
            old_data:req.body
        })
    }
    

})

exports.router = router;