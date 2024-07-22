const formidable = require('formidable');
const { responseReturn } = require('../utils/response');
const cloudinary = require('cloudinary').v2;
const productModel = require('../models/productModel');

class ProductController {
  add_product = async (req, res) => {
    const { id } = req;
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return responseReturn(res, 500, { error: 'Form parsing error' });
      }

      let {
        name,
        category,
        description,
        state,
        city,
        stock,
        discount,
        shopName,
      } = fields;

      let prices = [];
      if (fields.prices) {
        try {
          prices = JSON.parse(fields.prices);
        } catch (error) {
          return res.status(400).json({ error: 'Invalid prices format' });
        }
      }
      const { images } = files;

      // Trim name to avoid leading/trailing spaces and generate slug
      name = name.trim();
      const slug = name.split(' ').join('-').toLowerCase();

      // Set discount to 0 if not provided
      discount = discount ? parseInt(discount, 10) : 0;

      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
        secure: true,
      });

      try {
        let imageUrl = [];
        if (images && Array.isArray(images)) {
          for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.uploader.upload(
              images[i].filepath,
              {
                folder: 'products',
              }
            );
            imageUrl.push(result.url);
          }
        } else if (images) {
          // Handle single image file
          const result = await cloudinary.uploader.upload(images.filepath, {
            folder: 'products',
          });
          imageUrl.push(result.url);
        }

        await productModel.create({
          sellerId: id,
          name,
          slug,
          shopName,
          category: category.trim(),
          description: description.trim(),
          state,
          city,
          stock: parseInt(stock, 10),
          discount,
          prices,
          images: imageUrl,
        });

        responseReturn(res, 201, { message: 'Product added successfully' });
      } catch (error) {
        console.error(error);
        responseReturn(res, 500, { error: 'Something went wrong' });
      }
    });
  };

  // get the products from database
  get_product = async (req, res) => {
    const { page, searchValue, parPage } = req.query;
    const { id } = req;
    const skipPage = parseInt(parPage) * (parseInt(page) - 1);

    try {
      if (searchValue) {
        const products = await productModel
          .find({
            $text: { $search: searchValue },
            sellerId: id,
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalProduct = await productModel
          .find({
            $text: { $search: searchValue },
            sellerId: id,
          })
          .countDocuments();
        responseReturn(res, 200, { totalProduct, products });
      } else {
        const products = await productModel
          .find({ sellerId: id })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalProduct = await productModel
          .find({ sellerId: id })
          .countDocuments();
        responseReturn(res, 200, { totalProduct, products });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // to get a single product
  get_a_product = async (req, res) => {
    const { productId } = req.params;
    try {
      const product = await productModel.findById(productId);
      responseReturn(res, 200, { product });
    } catch (error) {
      console.log(error.message);
    }
  };

  // to update a product
  product_update = async (req, res) => {
    let {
      name,
      description,
      discount,
      prices,
      category,
      state,
      city,
      productId,
      stock,
    } = req.body;
    name = name.trim();
    const slug = name.split(' ').join('-');

    try {
      // Parse prices
      if (prices) {
        try {
          prices = JSON.parse(prices);
        } catch (error) {
          return res.status(400).json({ error: 'Invalid prices format' });
        }
      }
      await productModel.findByIdAndUpdate(productId, {
        name,
        description,
        discount,
        prices,
        category,
        state,
        city,
        stock,
        slug,
      });

      const product = await productModel.findById(productId);
      responseReturn(res, 200, {
        product,
        message: 'Product updated successfully',
      });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  // to update the images
  product_image_update = async (req, res) => {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, field, files) => {
      const { oldImage, productId } = field;
      const { newImage } = files;

      if (err) {
        responseReturn(res, 400, { error: error.message });
      } else {
        try {
          cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
            secure: true,
          });
          const result = await cloudinary.uploader.upload(newImage.filepath, {
            folder: 'products',
          });
          if (result) {
            let { images } = await productModel.findById(productId);
            const index = images.findIndex((img) => img === oldImage);
            images[index] = result.url;
            await productModel.findByIdAndUpdate(productId, { images });

            const product = await productModel.findById(productId);
            responseReturn(res, 200, {
              product,
              message: 'Product image updated successfully',
            });
          } else {
            responseReturn(res, 404, { error: 'Image upload failed' });
          }
        } catch (error) {
          responseReturn(res, 404, { error: error.message });
        }
      }
    });
  };
}

module.exports = new ProductController();
