const express = require("express")
const pool = require("../config")
const bcrypt = require('bcrypt');
const Joi = require("joi");
const jwt = require("jsonwebtoken")

router = express.Router();

const loginSchema = Joi.object({
    username: Joi.string().required().min(5).max(20).pattern(/^[A-Za-z0-9]+$/),
    password: Joi.string().required().min(4).max(20).pattern(/^[A-Za-z0-9]+$/)
})


router.post("/login", async function (req, res, next) {

    try {
        var login = await loginSchema.validateAsync(req.body, { abortEarly: false })
        var password = login.password
    } catch (err) {
        console.log(err)
        return res.status(400).send(err)
    }
    const connect = await pool.getConnection()
    await connect.beginTransaction()
    try {
        const [user, filed] = await connect.query("SELECT * FROM sys.Employees WHERE EMP_USERNAME=?", [login.username])
        if (user[0]) {
            if (!(await bcrypt.compare(password, user[0].EMP_PASSWORD))) {
                console.log('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง')
                return res.status(400).send("รหัสผ่านไม่ถูกต้อง")
            }
        }
        else{
            console.log('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง')
            return res.status(400).send("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง")
        }
        // createToken
        const token = jwt.sign({
            name: user[0].EMP_FNAME+' '+ user[0].EMP_LNAME ,
            role: user[0].EMP_ROLE,
        }, process.env.TOKEN_KEY,
            {
                expiresIn: "24h"
            }
        )
        console.log('ชื่อ'+user[0].EMP_FNAME + ' '+ user[0].EMP_LNAME)
        console.log(token)
        res.status(201).json(token)


        console.log('success')
    } catch (err) {
        connect.rollback();
        console.log(err)
    } finally {

        connect.release();
    }
});

exports.router = router