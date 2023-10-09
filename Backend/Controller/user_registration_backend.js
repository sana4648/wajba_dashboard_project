const db = require('../Database_configration/dbconfig');
const bcrypt = require('bcrypt');

exports.registerUser = (req, res) => {
    const { restaurant_name, user_name, email, password } = req.body;
    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).json({ error: 'Error hashing password' });
        }

        const sql = 'INSERT INTO restaurant_crediential (`restaurant_name`, `user_name`, `email`, `password`,`created_at`) VALUES (?, ?, ?, ?,NOW())';
        const values = [restaurant_name, user_name, email, hash];

        db.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error inserting data:', err);
                return res.status(500).json({ error: 'Error inserting data' });
            }

            console.log('Data inserted successfully.');
            return res.status(200).json({ status: 'success' });
        });
    });
};
