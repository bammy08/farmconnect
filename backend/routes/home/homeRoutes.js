const homeController = require('../../controllers/home/homeController');

const router = require('express').Router();

router.get('/get-category', homeController.get_category);
router.get('/get-product', homeController.get_product);
router.get('/price-range-filter', homeController.price_range);
router.get('/query-products', homeController.query_products);

module.exports = router;
