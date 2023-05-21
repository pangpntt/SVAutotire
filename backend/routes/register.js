const express = require("express");
const pool = require("../config");
const bcrypt = require('bcrypt');
const Joi = require('joi')
router = express.Router();



const usernameValidator = async (value, helper)=>{
    const [rows, filed] = await pool.query("SELECT EMP_USERNAME FROM sys.Employees WHERE EMP_USERNAME=?", [value])
    if(rows.length >0){
        const message = "ชื่อผู้ใช้งานนี้มีคนใช้ไปแล้ว"
        throw new Joi.ValidationError(message, {message})
    }
    return value
}
const roleValidator = (value, helper)=>{
    console.log(value.localeCompare('Employee') != 0 || value.localeCompare('Manager') != 0)
    if(value  === 'Employee' || value === 'Manager'){
        return value
    }
    else{
        const message = "กรุณากรอกRoleให้ถูกต้อง"
        throw new Joi.ValidationError(message, {message})
    }

}

const signupSchema = Joi.object({
    username: Joi.string().required().min(5).max(20).external(usernameValidator).pattern(/^[A-Za-z0-9]+$/),
    password: Joi.string().required().pattern(/^[A-Za-z0-9]+$/).min(4).max(20),
    firstname: Joi.string().required().max(50),
    lastname: Joi.string().required().max(50),
    role: Joi.string().pattern(/^[A-Za-z]+$/).required().custom(roleValidator)
})

router.post("/register/", async function(req, res, next){
    try{
        register = await signupSchema.validateAsync(req.body, {abortEarly: false})
        password = await bcrypt.hash(register.password, 5)
        await pool.query("INSERT INTO sys.Employees(EMP_USERNAME, EMP_PASSWORD, EMP_FNAME, EMP_LNAME, EMP_ROLE) VALUE(?, ?, ?, ?, ?)", [register.username, password, register.firstname, register.lastname, register.role])
        return res.status(200).json("SUCCESS")
    }catch(err){
        return res.status(400).send(err)
    }

})

exports.router = router;