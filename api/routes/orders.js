const express = require("express");
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling GET request to the /order"
    });
});

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    };
    res.status(200).json({
        message: "Order was created",
        order: order
    });
});

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: "Hey you discovered special ID.",
        orderId: req.params.orderId
    });
});

router.patch('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: "You Update the Order.",
        orderId: req.params.orderId
    });
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: "You Delete the Order.",
        orderId: req.params.orderId
    });
});
module.exports = router;