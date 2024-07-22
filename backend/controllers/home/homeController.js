const categoryModel = require('../../models/categoryModel');
const productModel = require('../../models/productModel');
const { responseReturn } = require('../../utils/response');

class homeController {
  formattedProduct = (products) => {
    const productArray = [];
    let i = 0;
    while (i < products.length) {
      let temp = [];
      let j = i;
      while (j < i + 3) {
        if (products[j]) {
          temp.push(products[j]);
        }
        j++;
      }
      productArray.push([...temp]);
      i = j;
    }
    return productArray;
  };

  // get category frontend
  get_category = async (req, res) => {
    try {
      const categories = await categoryModel.find({});
      responseReturn(res, 200, { categories });
    } catch (error) {
      console.log(error.message);
    }
  };

  // get product frontend
  get_product = async (req, res) => {
    try {
      const products = await productModel.find({}).limit(12).sort({
        createdAt: -1,
      });

      const allProduct1 = await productModel.find({}).limit(9).sort({
        createdAt: -1,
      });

      const latest_product = this.formattedProduct(allProduct1);
      const allProduct2 = await productModel.find({}).limit(9).sort({
        rating: -1,
      });

      const topRated_product = this.formattedProduct(allProduct2);
      const allProduct3 = await productModel.find({}).limit(9).sort({
        discount: -1,
      });

      const discount_product = this.formattedProduct(allProduct3);

      responseReturn(res, 200, {
        products,
        latest_product,
        topRated_product,
        discount_product,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // to filter the price range
  price_range = async (req, res) => {
    try {
      // Define the price range filter
      const priceRange = { low: 0, high: 0 };
      const minPrice = 1;
      const maxPrice = 500000;

      // Fetch products within the specified price range
      const products = await productModel
        .find({ 'prices.price': { $gte: minPrice, $lte: maxPrice } })
        .limit(9)
        .sort({ createdAt: -1 });

      const latest_product = this.formattedProduct(products);

      // Fetch the product with the lowest price
      const lowestPriceProduct = await productModel
        .findOne({ 'prices.price': { $gte: minPrice } })
        .sort({ 'prices.price': 1 });

      // Fetch the product with the highest price
      const highestPriceProduct = await productModel
        .findOne({ 'prices.price': { $lte: maxPrice } })
        .sort({ 'prices.price': -1 });

      if (lowestPriceProduct && highestPriceProduct) {
        priceRange.low = lowestPriceProduct.prices[0].price;
        priceRange.high = highestPriceProduct.prices[0].price;
      }

      responseReturn(res, 200, {
        latest_product,
        priceRange,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  query_products = async (req, res) => {
    const parPage = 12;
    const {
      category,
      rating,
      low,
      high,
      sortPrice,
      pageNumber,
      state,
      lga,
      searchValue,
    } = req.query;
    const page = parseInt(pageNumber) || 1;
    const skip = (page - 1) * parPage;

    try {
      let filter = {};

      if (category) filter.category = category;
      if (searchValue)
        filter.$or = [
          { name: { $regex: searchValue, $options: 'i' } },
          { description: { $regex: searchValue, $options: 'i' } },
        ];
      if (rating) filter.rating = { $gte: rating };
      if (low && high) filter['prices.price'] = { $gte: low, $lte: high };
      if (state) filter.state = state;
      if (lga) filter.lga = lga;

      let sort = { createdAt: -1 }; // default sorting
      if (sortPrice === 'ascending') {
        sort = { 'prices.price': 1 };
      } else if (sortPrice === 'descending') {
        sort = { 'prices.price': -1 };
      }

      const products = await productModel
        .find(filter)
        .skip(skip)
        .limit(parPage)
        .sort(sort);

      const totalProduct = await productModel.countDocuments(filter);

      responseReturn(res, 200, {
        products,
        totalProduct,
        parPage,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = new homeController();
