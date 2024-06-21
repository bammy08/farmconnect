const formidable = require('formidable');
const { responseReturn } = require('../utils/response');

const sellerModel = require('../models/sellerModel');

class sellerController {
  get_seller_request = async (req, res) => {
    const { page, searchValue, parPage } = req.query;
    const skipPage = parseInt(parPage) * (parseInt(page) - 1);
    try {
      if (searchValue) {
      } else {
        const sellers = await sellerModel
          .find({ status: 'pending' })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalSeller = await sellerModel
          .find({ status: 'pending' })
          .countDocuments();
        responseReturn(res, 200, { totalSeller, sellers });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  // get a single seller
  get_seller = async (req, res) => {
    const { sellerId } = req.params;
    try {
      const seller = await sellerModel.findById(sellerId);
      responseReturn(res, 200, { seller });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  // get seller status
  get_status = async (req, res) => {
    const { sellerId, status } = req.body;
    try {
      await sellerModel.findByIdAndUpdate(sellerId, { status });
      const seller = await sellerModel.findById(sellerId);
      responseReturn(res, 200, {
        seller,
        message: 'your account is now active',
      });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
}
module.exports = new sellerController();
