
const express = require('express');

const router = express.Router();

const ShopController = require('../controllers/shop');

router.get('/', ShopController.getIndex);

router.get('/products', ShopController.getProducts);

// here : is letting express know that there will be a variable value in route
//put any specific routes before the below route 
//for example: '/products/delete', otherwise in this case 'delete' will be treated as a variable value
//and will never be fired if its put after the below line.
router.get('/products/:productId', ShopController.getProduct);

// router.get('/cart', ShopController.getCart);

router.post('/cart', ShopController.postCart);

router.get('/checkout', ShopController.getCheckout);

router.get('/orders', ShopController.getOrders);

//router.post('/cart-delete-item', ShopController.postCartDeleteProduct);

module.exports = router;