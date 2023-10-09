// const express = require('express');
// const app = express();
// const db = require('./Database_configration/dbconfig')
// var bodyParser=require('body-parser');
// const cors = require('cors');

// app.use(express.json());
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(cors());

// const RegistrationRourter = require('./routes/user_registration_backend');
// const loginRouter = require('./routes/login_backend');
// const addRestaurantRouter = require('./routes/add_restaurant_backend');


// app.use('/Api',RegistrationRourter);
// app.use('/Api',loginRouter);
// app.use('/Api',addRestaurantRouter);

// app.listen(8081, () => {
//     console.log("Server is listening on port 8081");
// });



//require("dotenv").config();
const db = require('./Database_configration/dbconfig');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); 
const userRouter = require('./Router/user_routes');
const port = 8081;
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());


app.use('/Api', userRouter); // Use userRouter directly
// app.use('/api', otpVeri);

//Error Handling
app.use((err, _req, res, _next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
        message: err.message,
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });