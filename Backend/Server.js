// const express = require('express');
// const mysql = require('mysql');
// const cors = require('cors');

// const app = express();

// app.use(cors());
// app.use(express.json());
// const db = mysql .createConnection({
//     host:"localhost",
//     user:'root',
//     password:'',
//     database: 'resturant_db'


// })

// app.post('/resturant_db', (req,res) => {
//     const sql = "INSERT INTO login (`name`,`email`,`password`) VALUES (?)";
//     const values = [
//         req.body.name,
//         req.body.email,
//         req.body.password
//     ]
//     db.query(sql,[values], (err, data)=> {
//         if(err){
//             return res.json("Error");

//         }
//         return res.json(data);
//     })
// })

// app.listen(8081, () => {
//     console.log("listening");
// });


const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'restaurant_db'
})

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database as id ' + db.threadId);
});

app.post('/registration', (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const sql = "INSERT INTO login (name, email, password) VALUES (?, ?, ?)";
    const values = [`${firstName} ${lastName}`, email, password];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting data: ' + err);
            return res.status(500).json({ message: 'Error' });
        }
        console.log('Data inserted:', result);
        return res.status(200).json({ message: 'Success' });
    });
});
app.post('/login', (req, res) => {
   
    const sql = "SELECT * FROM login WHERE `email`=? AND `password` = ?";
    const values = [ req.body.email, req.body.password];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting data: ' + err);
            return res.status(500).json({ message: 'Error' });
        }
        if(result.length > 0){
        console.log('Data inserted:', result);
        return res.status(200).json({ message: 'Success' });
        }else{
            return res.status(200).json({ message: 'Fail' });
        }
    });
});


app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});
