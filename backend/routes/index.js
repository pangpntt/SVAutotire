const express = require("express")
const pool = require("../config")
const {verifyToken} = require('../middlewares/auth')
const router = express.Router();
const multer = require('multer')


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


// router.get("/", ifNotLogin, async function(req, res, next){
router.get("/", verifyToken ,async function(req, res, next){
    try{
        res.status(201).json("Success")
    }catch(err){
        console.log(err)
    }

})
exports.router = router;