const express = require("express")
const pool = require("../config")
const bcrypt = require('bcrypt');
const Joi = require("joi");
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');
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
        return res.status(400).send(err)
    }
    const connect = await pool.getConnection()
    await connect.beginTransaction()
    try {
        const [user, filed] = await connect.query("SELECT * FROM sys.Employees WHERE EMP_USERNAME=?", [login.username])
        if (!user[0]) {
            return res.status(400).send("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง")
        }

        else if (!(await bcrypt.compare(password, user[0].EMP_PASSWORD))) {
            return res.status(400).send("รหัสผ่านไม่ถูกต้อง")
        }

        const [tokens, filed2] = await connect.query("SELECT * FROM sys.Token WHERE user_id=?", [user[0].EMP_ID])
        try {
            newToken = uuidv4();
            const createAt = moment().format('YYYY-MM-DD HH:mm:ss')
            const expiredAt = moment().add(1, 'minute').format('YYYY-MM-DD HH:mm:ss');
            if (!tokens[0]) {
                await connect.query('INSERT INTO sys.Token(user_id, token, created, expired) VALUE(?, ?, ?, ?)', [user[0].EMP_ID, newToken, createAt, expiredAt])
            }
            else if (tokens[0].expired < new Date()) {
                await connect.query('UPDATE sys.Token SET created=?, expired=? WHERE id=?', [createAt, expiredAt, tokens[0].id])
            }
            connect.commit();
            return res.status(200).send("Success")
        }
        catch (err) {
            connect.rollback();
            throw err;
        } finally {
            connect.release();
        }

    } catch (err) {
        console.log(err)
    }
});

exports.router = router