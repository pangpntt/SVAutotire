const express = require("express")
const path = require("path")
const bodyParser = require('body-parser')
var cors = require('cors')
const app = express();

app.use(cors())

app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 


const register = require('./routes/register')
const index = require('./routes/index')
const login = require('./routes/login')
app.use(register.router)
app.use(index.router)
app.use(login.router)




app.listen(3000, ()=>{
    console.log('Start at 3000')
})

