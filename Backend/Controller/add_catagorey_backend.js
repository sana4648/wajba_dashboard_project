const db = require('../Database_configration/dbconfig');


// Create an API endpoint to insert data into the 'category' table
// app.post('/api/insert-category', 
exports.addCat = (req, res) => {
  const {  category_name, restaurant_id } = req.body;

  const sql = 'INSERT INTO category ( category_name, created_at, restaurant_id) VALUES ( ?, NOW(), ?)';
  const values = [ category_name, restaurant_id];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data: ' + err);
      res.status(500).send('Error inserting data');
    } else {
      console.log('Data inserted successfully');
      res.status(200).send('Data inserted successfully');
    }
  });
}