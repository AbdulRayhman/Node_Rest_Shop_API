/**
 * Import and requires here
 */
const express = require("express");
const app = express();
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

//Connect to Database
mongoose.connect('mongodb://admin:admin@rest-shop-shard-00-00-fpww5.mongodb.net:27017,rest-shop-shard-00-01-fpww5.mongodb.net:27017,rest-shop-shard-00-02-fpww5.mongodb.net:27017/test?ssl=true&replicaSet=rest-shop-shard-0&authSource=admin');
/**
 * App Middleware Define Here
 */
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * CORS Error Problem resolve
 */

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

/**
 * App Routes
 */
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);

/**
 * If the Request not found.
 */
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status(404);
    next(error);
});
/**
 * If Status 500 or Error
 */
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })

})
app.use((req, res, next) => {
    res.status(200).json({
        message: "Message from app.js!"
    })
});
module.exports = app;