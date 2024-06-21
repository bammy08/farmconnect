const formidable = require('formidable');
const { responseReturn } = require('../utils/response');
const cloudinary = require('cloudinary');
const categoryModel = require('../models/categoryModel');

class categoryController {
  add_category = async (req, res) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        responseReturn(res, 404, { error: 'Something went wrong' });
      } else {
        let { name } = fields;
        let { image } = files;
        name = name.trim();
        const slug = name.split(' ').join('-');

        cloudinary.config({
          cloud_name: process.env.cloud_name,
          api_key: process.env.api_key,
          api_secret: process.env.api_secret,
          secure: true,
        });
        try {
          const result = await cloudinary.uploader.upload(image.filepath, {
            folder: 'categories',
          });
          if (result) {
            const category = await categoryModel.create({
              name,
              slug,
              image: result.url,
            });
            responseReturn(res, 201, {
              category,
              message: 'Category is added successfully ',
            });
          } else {
            responseReturn(res, 404, { error: 'Image upload ' });
          }
        } catch (error) {
          responseReturn(res, 500, { error: 'Something went wrong' });
        }
      }
    });
  };

  get_category = async (req, res) => {
    const { page, searchValue, parPage } = req.query;
    try {
      let skipPage = '';
      if (parPage && page) {
        skipPage = parseInt(parPage) * (parseInt(page) - 1);
      }
      if (searchValue && page && parPage) {
        const categories = await categoryModel
          .find({
            $text: { $search: searchValue },
          })
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalCategory = await categoryModel
          .find({
            $text: { $search: searchValue },
          })
          .countDocuments();
        responseReturn(res, 200, { totalCategory, categories });
      } else if (searchValue === '' && page && parPage) {
        const categories = await categoryModel
          .find({})
          .skip(skipPage)
          .limit(parPage)
          .sort({ createdAt: -1 });
        const totalCategory = await categoryModel.find({}).countDocuments();
        responseReturn(res, 200, { totalCategory, categories });
      } else {
        const categories = await categoryModel.find({}).sort({ createdAt: -1 });
        const totalCategory = await categoryModel.find({}).countDocuments();
        responseReturn(res, 200, { totalCategory, categories });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = new categoryController();
