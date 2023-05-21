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
    name: Joi.string().required().min(3).max(50).external(nameValidator),
    note: Joi.string().required()
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
        await pool.query("INSERT INTO sys.warehouse(warehouse_name, note) value(?, ?)", [warehouse.name, warehouse.note])
        res.status(200).json("SUCCESS")
    }catch(err){
        return res.status(400).send(err)
    }
})

router.delete("/warehouse/:id", verifyToken, async function(req, res, next){

    number = req.params.id

    try{
        await pool.query("DELETE from sys.warehouse where warehouse_id = ?", [number])
        res.status(200).json("SUCCESS")
    }catch(err){
        console.log(err)
        return res.status(400).send(err)
    }
})

router.put("/warehouse/edit/:id", verifyToken, async function(req, res, next){
    number = req.params.id
    console.log(number)
    console.log(req.body.name)

    try{
        await pool.query("UPDATE sys.warehouse set warehouse_name = ?, note = ? WHERE warehouse_id = ?", [req.body.name,req.body.note,number])
        res.status(200).json("SUCCESS")
    }catch(err){
        console.log(err)
        return res.status(400).send(err)
    }
})

exports.router = router;