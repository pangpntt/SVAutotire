const express = require("express");
const pool = require("../config");
const router = express.Router();
const multer = require('multer');
const {verifyToken} = require('../middlewares/auth');
const path = require("path")


var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './static/uploads') // path to save file
    },
    filename: function (req, file, callback) {
      // set file name
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })

const upload = multer({ storage: storage })

router.get('/stock', upload.single('myImage'), async function (req, res, next) {
    const file = req.file;
    if (!file) {
        const error = new Error("Please upload a file");
        error.httpStatusCode = 400;
        return next(error);
    }

    const product_code = req.body.product_code
    const product_name = req.body.product_name
    const price = req.body.price
    const total = req.body.total

    const conn = await pool.getConnection()
    await conn.beginTransaction();

    let results = await conn.query(
        "INSERT INTO product(product_code, product_name, price, total) VALUES(?,?,?,?)",
        [product_code, product_name, price, total]
    )

    const productId = results[0].insertId;

    await conn.query("INSERT INTO product(product_code, file_path) VALUES(?, ?);",[productId, file.path.substr(6)])

    conn.commit()
    res.send("success!");
    
    await conn.rollback();
    return next(error)
})

router.post("/wheel",  upload.single('myImage'), async function (req, res, next) {

    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
        const file = req.file;
        const [product, feilds] = await conn.query("SELECT * FROM sys.product WHERE product_code = ?", [req.body.product_code])

        if(product[0]) {
            console.log(product[0])
            await conn.query("UPDATE sys.product SET total=? WHERE product_code = ?", [req.body.total, req.body.product_code])
            res.json({ message: "Update product " + req.body.product_code + " Complete" })
        }
        else {
            let results = await conn.query(
                "INSERT INTO sys.product(product_code, product_name, price, total) VALUES(?,?,?,?)",
                [req.body.product_code, req.body.product_name, req.body.price, req.body.total]
            )
            var productId = results[0].insertId;
            res.json({ message: "Insert " + req.body.product_code + " Complete" })

            await conn.query("UPDATE sys.product SET image=? WHERE id=?;",[file.path.substr(6), productId])
            console.log(file.path.substr(6))
        }

        // const [warehouse, feild] = await conn.query("SELECT * FROM sys.warehouse WHERE warehouse_name=?", [req.body.warehouse_name])
        // if(!warehouse[0]){
        //     // await conn.rollback();
        //     return res.json({"message": "ไม่มีคลังสินค้านี้"})
        // }

        // await conn.query(
        //     "INSERT INTO sys.wheel(wheel_code, company, model, size, pcd, et, cb, color, price, note, warehouse_id, wheel_name) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",
        //     [req.body.product_code, req.body.company, req.body.model, req.body.size, req.body.pcd, req.body.et, req.body.cb, req.body.color, req.body.price, req.body.note, req.body.warehouse_id, req.body.product_name]
        // )
        // res.json({ message: "Insert " + req.body.product_code + " Complete" })

        // await conn.query(
        //     "INSERT INTO sys.Purchase_history(product_id, product_code, Purchase_history_date, product_name, price, total) VALUES(?, ?, ?, ?, ?, ?)",
        //     [productId, req.body.product_code, req.body.Purchase_history_date, req.body.product_name, req.body.price, req.body.total]
        // )
        // res.json({ message: "Insert " + req.body.product_code + " Complete" })
        conn.commit()
    }
    catch(err){
        await conn.rollback();
        return next(err)
    }finally {
        console.log('finally')
        conn.release();
      }
})


exports.router = router