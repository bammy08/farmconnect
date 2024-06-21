const categoryController = require('../controllers/categoryController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = require('express').Router();

router.post('/addCategory', authMiddleware, categoryController.add_category);
router.get('/get-category', authMiddleware, categoryController.get_category);

module.exports = router;
