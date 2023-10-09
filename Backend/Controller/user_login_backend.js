const db = require('../Database_configration/dbconfig');
const bcrypt = require('bcrypt');

exports.loginUser = (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM restaurant_crediential WHERE email = ?";
    
    db.query(sql, [email], async (err, data) => {
        if (err) {
            console.error('Error fetching user data:', err);
            return res.status(500).json({ error: 'Error fetching user data' });
        }

        if (data.length > 0) {
            try {
                // Compare passwords using bcrypt
                const passwordMatch = await bcrypt.compare(password, data[0].password);

                if (passwordMatch) {
                    // Update last_login and login_count in the database
                    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
                    const updateSql = "UPDATE restaurant_crediential SET last_login = ?, login_count = login_count + 1 WHERE email = ?";
                    db.query(updateSql, [currentDate, email], (updateErr, updateResult) => {
                        if (updateErr) {
                            console.error('Error updating login information:', updateErr);
                            return res.status(500).json({ error: 'Error updating login information' });
                        }

                        // Return the updated user data in the response
                        return res.status(200).json({
                            status: 'Success',
                            user: { ...data[0], last_login: currentDate, login_count: data[0].login_count + 1 }
                        });
                    });
                } else {
                    return res.status(401).json({ error: 'Invalid credentials' });
                }
            } catch (error) {
                console.error('Error comparing passwords:', error);
                return res.status(500).json({ error: 'Error comparing passwords' });
            }
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    });
};
