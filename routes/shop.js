
const express = require('express');

const router = express.Router();

const ShopController = require('../controllers/shop');
const isAuth = require('../middleware/is-auth');

router.get('/', ShopController.getIndex);

router.get('/products', ShopController.getProducts);

// // here : is letting express know that there will be a variable value in route
// //put any specific routes before the below route 
// //for example: '/products/delete', otherwise in this case 'delete' will be treated as a variable value
// //and will never be fired if its put after the below line.
router.get('/products/:productId', ShopController.getProduct);

router.get('/cart', isAuth, ShopController.getCart);

router.post('/cart', isAuth, ShopController.postCart);

// router.get('/checkout', ShopController.getCheckout);

router.post('/create-order', isAuth, ShopController.postOrder);

router.get('/orders', isAuth, ShopController.getOrders);

router.post('/cart-delete-item', isAuth, ShopController.postCartDeleteProduct);

router.get('/orders/:orderId', isAuth, ShopController.getInvoice);


module.exports = router;