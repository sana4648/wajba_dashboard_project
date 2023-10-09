  

// const express = require('express');
// 
// const cors = require('cors');
// const app = express();
// app.use(express.json());
// // app.use(cors(
// //     origin= "http://localhost:",
// // ))





// var db = mysql.createConnection({
//     host:"localhost",
//     user: 'root',
//     password: '',
//     database: 'wajba'
// })

// db.connect((err) => {
//     if (err) {
//         console.error('Database connection failed: ' + err.stack);
//         return;
//     }
//     console.log('Connected to database as id ' + db.threadId);
// });

// module.exports =db;






//const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;
const mysql = require('mysql');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "wajba",
});

// The pool is now ready to be used for queries.

module.exports = pool; // Export the pool for use in other modules