const customerModel = require('../../models/customerModel');
const { responseReturn } = require('../../utils/response');
const { createToken } = require('../../utils/createToken');
const sellerCustomerModel = require('../../models/chat/sellerCustomerModel');
const bcrypt = require('bcrypt');

class customerAuthController {
  customer_register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
      const customer = await customerModel.findOne({ email });
      if (customer) {
        responseReturn(res, 404, { error: 'Email already exits' });
      } else {
        const createCustomer = await customerModel.create({
          username: username.trim(),
          email: email.trim(),
          password: await bcrypt.hash(password, 10),
          method: 'manually',
        });
        await sellerCustomerModel.create({
          myId: createCustomer.id,
        });
        const token = await createToken({
          id: createCustomer.id,
          username: createCustomer.username,
          email: createCustomer.email,
          method: createCustomer.method,
        });
        res.cookie('customerToken', token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        responseReturn(res, 201, { message: 'Registration successful', token });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  customer_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const customer = await customerModel
        .findOne({ email })
        .select('+password');
      if (customer) {
        const match = await bcrypt.compare(password, customer.password);
        if (match) {
          const token = await createToken({
            id: customer.id,
            username: customer.username,
            email: customer.email,
            method: customer.method,
          });
          res.cookie('customerToken', token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 201, { message: 'Login successful', token });
        } else {
          responseReturn(res, 404, { error: 'Password does not match' });
        }
      } else {
        responseReturn(res, 404, { error: 'Email not found' });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  customer_logout = async (req, res) => {
    res.cookie('customerToken', '', {
      expires: new Date(Date.now()),
    });
    responseReturn(res, 200, { message: 'Logout success' });
  };
}

module.exports = new customerAuthController();
