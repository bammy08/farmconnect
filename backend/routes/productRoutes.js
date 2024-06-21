const productController = require('../controllers/productController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.post('/addProduct', authMiddleware, productController.add_product);
router.get('/get-product', authMiddleware, productController.get_product);
router.get(
  '/get-a-product/:productId',
  authMiddleware,
  productController.get_a_product
);
router.post(
  '/product-update',
  authMiddleware,
  productController.product_update
);
router.post(
  '/product-image-update',
  authMiddleware,
  productController.product_image_update
);

module.exports = router;
