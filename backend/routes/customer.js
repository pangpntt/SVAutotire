const Joi = require("joi");
const express = require("express")
const pool = require("../config")
const {verifyToken} = require('../middlewares/auth');
const router = express.Router();

const licensePlateValidator = async(value, helper) =>{
    const [data, filed] = await pool.query('SELECT license_plate from sys.customer WHERE license_plate like ?;', [value]);
    console.log(data)
    if(data.length > 0){
        const message = "มีเลขทะเบียนนี้อยู่ในระบบแล้ว"
        throw new Joi.ValidationError(message, {message})
    }
    return value
}   

const customerSchema = Joi.object({
    firstname: Joi.string().min(2).max(30).required(),
    lastname: Joi.string().min(2).max(30).required(),
    mile: Joi.number().required(),
    licensePlate: Joi.string().required().external(licensePlateValidator)
})

const editCustomerSchema = Joi.object({
    firstname: Joi.string().min(2).max(30).required(),
    lastname: Joi.string().min(2).max(30).required(),
    mile: Joi.number().required(),
    licensePlate: Joi.string().required()
})

router.get("/customer", verifyToken ,async function(req, res, next){
    try{
        const [customer, filed] =await pool.query("SELECT * from sys.customer")
        res.status(200).json(customer)
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    } 
})


router.post("/customer", verifyToken, async function(req, res, next){
    try{
        customer = await customerSchema.validateAsync(req.body, {abortEarly: false})
        await pool.query("INSERT INTO sys.customer(cus_fname, cus_lname, cus_mile, license_plate) value(?, ?, ?, ?)", [customer.firstname, customer.lastname, customer.mile, customer.licensePlate])
        res.status(200).json("SUCCESS")
    }catch(err){
        console.log(err)
        return res.status(400).send(err)
    }
})

router.put("/customer/:id", verifyToken, async function(req, res, next){
    id = req.params.id
    console.log("success3")
    try{
        customer = await editCustomerSchema.validateAsync(req.body, {abortEarly: false})
        await pool.query("UPDATE sys.customer set cus_fname=?, cus_lname=?, cus_mile=?, license_plate=? WHERE cus_id = ?", [customer.firstname, customer.lastname, customer.mile, customer.licensePlate, id])
        res.status(200).json("SUCCESS")
    }catch(err){
        console.log(err)
        return res.status(400).send(err)
    }
})

exports.router = router;