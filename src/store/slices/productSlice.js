import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchAllProductsStart: (state) => {
      state.loading = true;
    },
    fetchAllProductsSuccess(state, action) {
      state.loading = false;
      state.products = action.payload;
    },
    fetchAllProductsFailure(state, action) {
      state.loading = false;
      state.error = true;
      state.error = action.payload;
    },
  },
});

export const {
  fetchAllProductsStart,
  fetchAllProductsSuccess,
  fetchAllProductsFailure,
} = productSlice.actions;

export default productSlice.reducer;
