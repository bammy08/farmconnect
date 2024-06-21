const sellerController = require('../controllers/sellerController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.get(
  '/get-seller-request',
  authMiddleware,
  sellerController.get_seller_request
);
router.get(
  '/get-a-seller/:sellerId',
  authMiddleware,
  sellerController.get_seller
);
router.post('/seller-status', authMiddleware, sellerController.get_status);

module.exports = router;
