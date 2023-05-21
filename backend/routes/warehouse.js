const Joi = require("joi");
const express = require("express")
const pool = require("../config")
const {verifyToken} = require('../middlewares/auth');
const router = express.Router();

const nameValidator = async(value, helper)=>{
    const [data, filed] = await pool.query('SELECT warehouse_name from sys.warehouse WHERE warehouse_name like ?;', [value]);
    if(data.length > 0){
        const message = "มีชื่อที่เก็บนี้อยู่แล้ว"
        throw new Joi.ValidationError(message, {message})
    }
}


const warehouseSchema = Joi.object({
    name: Joi.string().required().min(3).max(50).external(nameValidator)
    // firstname: Joi.string().min(2).max(30).required(),
    // lastname: Joi.string().min(2).max(30).required(),
    // mile: Joi.number().required(),
    // licensePlate: Joi.string().required()//.external(licensePlateValidator)
})

router.get("/warehouse", verifyToken ,async function(req, res, next){
    try{
        const [warehouse, filed] =await pool.query("SELECT * from sys.warehouse")
        res.status(200).json(warehouse)
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    } 
})


router.post("/warehouse", verifyToken, async function(req, res, next){
    try{
        warehouse = await warehouseSchema.validateAsync(req.body, {abortEarly: false})
        await pool.query("INSERT INTO sys.warehouse(warehouse_name) value(?)", [warehouse.name])
        res.status(200).json("SUCCESS")
    }catch(err){
        return res.status(400).send(err)
    }
})

exports.router = router;