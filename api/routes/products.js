const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const ProductModal = require('../../modals/ProductModal');
const checkAuth = require('../../middleware/checkAuth');
router.get('/GetAllProducts', (req, res, next) => {
    ProductModal.find()
        .exec()
        .then((result) => {
            console.log("Product List -->", result);
            res.status(200).json({
                message: "Products List",
                products: result
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post('/', checkAuth, (req, res, next) => {
    const product = new ProductModal({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created product successfully",
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/products/" + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get('/GetProductById/:productId', (req, res, next) => {

    ProductModal.findById(req.params.productId)
        .exec()
        .then((result) => {
            console.log(result);
            res.status(200).json({
                message: "GetProductById",
                product: result
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json({
                message: "No valid entry found for provided ID"
            });
        });
});

router.patch('/UpdateProductById/:productId', (req, res, next) => {
    const productId = req.params.productId;
    const updateOps = {};
    console.log(req.body);

    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    ProductModal.update({ _id: productId }, { $set: updateOps })
        .exec()
        .then((result) => {
            console.log(result);
            res.status(200).json({
                message: "Product Updated",
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/' + productId
                }
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json({
                message: "No valid entry found for provided ID"
            });
        });
    //    ProductModal.findByIdAndUpdate(req.params.productId)
    //    .exec()
    //    .then((result)=>{
    //         console.log(result);


    //    })
    //    .catch((err)=>{
    //         console.log(err);

    //    });
    // res.status(200).json({
    //     message: "You Update the product.",
    //     createProduct: product
    // });
});

router.delete('/DeleteProductById/:productId', (req, res, next) => {
    res.status(200).json({
        message: "You Delete the product.",
        createProduct: product
    });
});

module.exports = router;