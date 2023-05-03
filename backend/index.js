const express = require("express")
const path = require("path")
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session');
const app = express();
var cors = require('cors')

app.use(cors())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false}));

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],

}));

const register = require('./routes/register')
const index = require('./routes/index')
const login = require('./routes/login')
app.use(register.router)
app.use(index.router)
app.use(login.router)




app.listen(3000, ()=>{
    console.log('Start at 3000')
})

