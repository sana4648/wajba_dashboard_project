const db = require('../Database_configration/dbconfig');



// Define an endpoint to insert data into the 'menu' table
exports.add_food = (req, res) => {
  const { menu_name, menu_price, menu_description, category_name, time_preparation } = req.body;
  const menu_image =req.file.filename;

  // Step 1: Check if the category exists
  const checkCategorySQL = 'SELECT * FROM category WHERE category_name = ?';
  db.query(checkCategorySQL, [category_name], (categoryErr, categoryResult) => {
    if (categoryErr) {
      console.error('Error checking category: ' + categoryErr);
      res.status(500).json({ error: 'Error checking category' });
      return;
    }

    // If the category exists, categoryResult will contain the category data
    // Otherwise, it will be an empty array

    if (categoryResult.length === 0) {
      // The category doesn't exist, return an error response
      res.status(404).json({ error: 'Category not found' });
    } else {
      // Step 2: Fetch the category ID
      const categoryId = categoryResult[0].category_id;

      // Step 3: Insert data into the 'menu' table with the fetched category ID
      const insertMenuSQL = `INSERT INTO menu (menu_name, menu_price, menu_description, menu_image, category_id, time_prepration) VALUES (?, ?, ?, ?, ?, ?)`;

      db.query(
        insertMenuSQL,
        [menu_name, menu_price, menu_description, menu_image, categoryId, time_preparation],
        (err, result) => {
          if (err) {
            console.error('Error inserting data: ' + err);
            res.status(500).json({ error: 'Error inserting data' });
            return;
          }

          console.log('Data inserted successfully.');
          res.status(200).json({ message: 'Data inserted successfully' });
        }
      );
    }
  });
};


// exports.add_food = (req, res) => {
//   const { menu_name, menu_price, menu_description, category_id, time_preparation } = req.body;
//   const menu_image = req.file.filename; 

//   console.log(req.file.filename);

//   // SQL query to insert data into the 'menu' table
//   const sql = `INSERT INTO menu (menu_name, menu_price, menu_description, menu_image, category_id, time_prepration) VALUES (?, ?, ?, ?, ?, ?)`;

//   db.query(
//     sql,
//     [menu_name, menu_price, menu_description, menu_image, category_id, time_preparation],
//     (err, result) => {
//       if (err) {
//         console.error('Error inserting data: ' + err);
//         res.status(500).json({ error: 'Error inserting data' });
//         return;
//       }

//       console.log('Data inserted successfully.');
//       res.status(200).json({ message: 'Data inserted successfully' });
//     }
//   );
// }