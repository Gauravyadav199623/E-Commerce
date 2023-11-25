const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId',shopController.getProduct)
//the ":" signals the express to not look for a particular routes but instead the the "productId" can be anything

router.get('/cart', shopController.getCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;
