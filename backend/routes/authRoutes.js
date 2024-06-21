const authController = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.post('/admin-login', authController.admin_login);
router.get('/get-user', authMiddleware, authController.getUser);
router.post('/seller-register', authController.seller_register);
router.post('/seller-login', authController.seller_login);
router.post('/add-profile', authMiddleware, authController.add_profile_info);
router.post(
  '/profile-image-upload',
  authMiddleware,
  authController.profile_image_upload
);

module.exports = router;
