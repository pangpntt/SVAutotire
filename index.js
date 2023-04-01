const express = require("express")
const path = require("path")
const bodyParser = require('body-parser')

const app = express();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false}));

const register = require('./routes/register')
const index = require('./routes/index')
const login = require('./routes/login')
app.use(register.router)
app.use(index.router)
app.use(login.router)


app.listen(8080, ()=>{
    console.log('Start at 8080')
})

