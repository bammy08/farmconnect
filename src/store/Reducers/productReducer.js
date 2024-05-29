import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

// create product
export const addProduct = createAsyncThunk(
  'product/addProduct',
  async (product, { rejectWithValue, fulfillWithValue }) => {
    try {
      const formData = new FormData();

      const { data } = await api.post('addProduct', product, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// get category
export const getProduct = createAsyncThunk(
  'product/getProduct',
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/get-product?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,
        {
          withCredentials: true,
        }
      );

      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const productReducer = createSlice({
  name: 'product',

  initialState: {
    successMessage: '',
    errorMessage: '',
    loader: false,
    products: [],
    totalProduct: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(addProduct.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
      })
      .addCase(addProduct.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.products = [...state.products, payload.product];
      })
      .addCase(getProduct.fulfilled, (state, { payload }) => {
        state.totalProduct = payload.totalProduct;
        state.products = payload.products;
      });
  },
});

export const { messageClear } = productReducer.actions;
export default productReducer.reducer;
