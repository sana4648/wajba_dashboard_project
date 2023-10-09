const db = require('../Database_configration/dbconfig');
// Assuming you have required necessary dependencies and set up your Express app and database connection (db) appropriately

exports.addRestaurant = (req, res) => {
  const { resturant_name, restaurant_address, restaurant_contact } = req.body;
  const resturant_image = req.file.filename; // Assuming you're using multer or a similar middleware for file uploads
  console.log(req.body);
  // SQL query to insert data into the 'restaurant' table
  const sql = `INSERT INTO restaurant (resturant_name, resturant_image, restaurant_address, restaurant_contact) VALUES (?, ?, ?, ?)`;
  try {
    if (!req.file) {
      throw new Error('No file uploaded.'); // Handle the case when no file is provided
  }
  if (err instanceof multer.MulterError) {
    // A Multer error occurred when uploading.
    return res.status(500).json({ error: 'Multer error' });
} 
  
    db.query(sql, [resturant_name, resturant_image, restaurant_address, restaurant_contact], (err, result) => {
      console.log(result);
      if (err) {
        console.error('Error inserting data:', err);
        console.log('SQL Query:', sql);
        // res.status(500).json({ error: err.message }); // Sending back the actual error message
        console.log('Received request:', req.body);
        return;
      }
      else {

        console.log('Data inserted successfully.');
        return res.status(200).json({ status: 'Success', });
      }
    }
  );}
  catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({ status: 'Error', error: error.message });
  }

};



