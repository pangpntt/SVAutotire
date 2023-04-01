const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host: 'database-1.czp2l9ina8ut.ap-southeast-2.rds.amazonaws.com',
    user: 'root',
    password: 'North123456789',
    port: 3306
})

module.exports = pool;