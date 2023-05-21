
const jwt = require('jsonwebtoken')

const env = process.env

const verifyToken = (req, res, next) =>{
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    if(!token){
        return res.status(403).send("A token is require for authentication")
    }
    try{
        const decoded = jwt.verify(token, env.TOKEN_KEY)
        req.user = decoded // set ค่าให้กับUser
    }catch(err){
        console.log("กรุณาloginใหม่", err)
        return res.status(401).json(err)
    }

    return next()
}

module.exports={
    verifyToken
}
  