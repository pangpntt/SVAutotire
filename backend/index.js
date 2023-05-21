require ('dotenv').config()
const express = require("express");
const path = require("path");
// const bodyParser = require('body-parser');
const  cors = require('cors');
const app = express();
// const routerToken = express.Router()
const {API_PORT} = process.env;
app.use(cors())

// app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
// app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 




const register = require('./routes/register')
const index = require('./routes/index')
const login = require('./routes/login')
const customer = require('./routes/customer')
const warehouse = require('./routes/warehouse')
const product = require('./routes/product')
app.use(register.router)
app.use(index.router)
app.use(login.router)
app.use(customer.router)
app.use(product.router)
app.use(warehouse.router)




app.listen(API_PORT, ()=>{
    console.log(`Start at port ${API_PORT}`)
})

