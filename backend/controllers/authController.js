const adminModel = require('../models/adminModel');
const sellerCustomerModel = require('../models/chat/sellerCustomerModel');
const sellerModel = require('../models/sellerModel');
const { createToken } = require('../utils/createToken');
const { responseReturn } = require('../utils/response');
const bcrypt = require('bcrypt');
const formidable = require('formidable');
const cloudinary = require('cloudinary').v2;

class authController {
  // admin login

  admin_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const admin = await adminModel.findOne({ email }).select('+password');

      if (admin) {
        const match = await bcrypt.compare(password, admin.password);

        if (match) {
          const token = await createToken({
            id: admin.id,
            role: admin.role,
          });
          res.cookie('accessToken', token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 200, { token, message: 'Login is successful' });
        } else {
          responseReturn(res, 404, { error: 'Password is Incorrect' });
        }
      } else {
        responseReturn(res, 404, { error: 'Email not Found' });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  // method ended

  // seller registration

  seller_register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const getUser = await sellerModel.findOne({ email });
      if (getUser) {
        responseReturn(res, 404, { error: 'Email already exist' });
      } else {
        const seller = await sellerModel.create({
          username,
          email,
          password: await bcrypt.hash(password, 10),
          method: 'manually',
          shopInfo: {},
        });
        await sellerCustomerModel.create({ myId: seller.id });
        const token = await createToken({
          id: seller.id,
          role: seller.role,
        });
        res.cookie('accessToken', token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        responseReturn(res, 201, { token, message: 'Registration successful' });
      }
    } catch (error) {
      responseReturn(res, 500, { error: 'Internal server error' });
    }
  };
  // end method

  // seller login
  seller_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const seller = await sellerModel.findOne({ email }).select('+password');

      if (seller) {
        const match = await bcrypt.compare(password, seller.password);

        if (match) {
          const token = await createToken({
            id: seller.id,
            role: seller.role,
          });
          res.cookie('accessToken', token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 200, { token, message: 'Login is successful' });
        } else {
          responseReturn(res, 404, { error: 'Password is Incorrect' });
        }
      } else {
        responseReturn(res, 404, { error: 'Email not Found' });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  // end method

  getUser = async (req, res) => {
    const { id, role } = req;

    try {
      if (role === 'admin') {
        const user = await adminModel.findById(id);
        responseReturn(res, 200, { userInfo: user });
      } else {
        const seller = await sellerModel.findById(id);
        responseReturn(res, 200, { userInfo: seller });
      }
    } catch (error) {
      responseReturn(res, 500, { error: 'Internal server error' });
    }
  };

  // profile image upload
  profile_image_upload = async (req, res) => {
    const { id } = req;
    const form = formidable({ multiples: true });
    form.parse(req, async (err, _, files) => {
      if (err) {
        logger.error(err.message);
        return responseReturn(res, 500, { error: 'Form parsing error' });
      }
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
        secure: true,
      });
      const { image } = files;
      try {
        const result = await cloudinary.uploader.upload(image.filepath, {
          folder: 'profile',
        });
        if (result) {
          await sellerModel.findByIdAndUpdate(id, {
            image: result.url,
          });
          const userInfo = await sellerModel.findById(id);
          responseReturn(res, 201, {
            message: 'image upload successfully',
            userInfo,
          });
        } else {
          responseReturn(res, 404, { error: 'image upload failed' });
        }
      } catch (error) {
        //console.log(error)
        responseReturn(res, 500, { error: error.message });
      }
    });
  };

  // add profile
  add_profile_info = async (req, res) => {
    const { phone, shopName } = req.body;
    const { id } = req;
    try {
      await sellerModel.findByIdAndUpdate(id, {
        shopInfo: {
          phone,
          shopName,
        },
      });
      const userInfo = await sellerModel.findById(id);

      responseReturn(res, 201, {
        message: 'Profile updated successfully',
        userInfo,
      });
    } catch (error) {
      responseReturn(res, 500, { error: 'Internal server error' });
    }
  };
}

module.exports = new authController();
