const express = require("express");
const pool = require("../config");
const router = express.Router();

router.post("/import", async (req, res, next) => {
    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
        const [im, feild] = await conn.query("SELECT * FROM sys.product WHERE id=?", [req.body.id])

        let results = await conn.query(
            "INSERT INTO sys.sale( type, customer, employee, sale_date, price, total) VALUES(?,?,?,?,?,?)",
            [ req.body.type, req.body.customer, req.body.employee, req.body.sale_date, req.body.price, req.body.total]
            
        )
        var customerId = results[0].insertId;
        res.json({ message: "Insert Complete" })
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