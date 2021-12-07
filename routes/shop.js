
const express = require('express');

const router = express.Router();

const ShopController = require('../controllers/shop');

router.get('/', ShopController.getIndex);

router.get('/products', ShopController.getProducts);

router.get('/cart', ShopController.getCart);

router.get('/checkout', ShopController.getCheckout);

module.exports = router;