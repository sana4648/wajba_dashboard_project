const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const user_login_controller = require('../Controller/user_login_backend');
const user_registration_controller = require('../Controller/user_registration_backend');
const addCategory_Controller = require('../Controller/add_catagorey_backend');
//const food_Controller = require('../Controller/add_food_backend');
const restaurant_controller = require('../Controller/add_restaurant_backend');
// const recipe_controller = require('../controller/add_recipe');
// const purchase_controller = require('../controller/add_purchase');
// const fetch_purchase = require('../controller/fetch_purchase');
// const fetch_order = require('../controller/fetch_order_by_restaruant_id');
// const stock_controller = require('../controller/add_stock');
// const menu_controller = require('../controller/fetch_menu');
// const storage = multer.diskStorage({
//     destination : './src/image',
//     filename: (req,file,cb) => {
//         return cb(null, `${file.filename}_${Date.now()}${path.extname(file.originalname)}`)
//     }
// }) 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Store uploaded files in the 'uploads' directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Rename the file with a timestamp prefix
    }
});
const fileFilter = (req, file, cb) => {
    // Check if the file type is acceptable
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        // Accept the file
        cb(null, true);
    } else {
        // Reject the file
        cb(new Error('Invalid file type. Only JPEG and PNG images are allowed.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
})
router.post('/login',user_login_controller.loginUser );
router.post('/registration',user_registration_controller.registerUser );
router.post('/insertcategory', addCategory_Controller.addCat);
//router.post('/insertmenu',upload.single('menu_image'),food_Controller.add_food);
router.post('/insertrestaurant' ,upload.single('restaurant_image'), restaurant_controller.addRestaurant);
// router.post('/insertrecipe', recipe_controller.add_recipe);
// router.post('/insertpurchase' , purchase_controller.add_purchase);
// router.get('/getPurchases/:resturant_id',fetch_purchase.get_purchase);
// router.get('/fetch/:restaurantId', fetch_order.getOrdersByRestaurantId);
// router.post('/addStock', stock_controller.addStock);
// router.get('/restaurant_menu/:restaurant_id', menu_controller.get_menu);
module.exports = router;