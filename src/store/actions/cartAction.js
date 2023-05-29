import axiosClient from "@lib/axios";

import {
  addItem,
  cartStart,
  cartSuccess,
  clearCart,
  fetchCartSuccess,
  removeItem,
} from "@store/slices/cartSlice";

export const fetchCartItems = (userId) => async (dispatch) => {
  try {
    dispatch(clearCart());
    dispatch(cartStart());

    const res = await axiosClient.get(`/api/users/${userId}/cart`);
    const cart = res.data.data;

    if (cart) {
      const products = [];
      for (const item of cart.items) {
        const res = await axiosClient.get(`/api/products/${item.product}`);
        const product = res.data.data;
        product.quantity = item.quantity;
        products.push(product);
      }
      dispatch(fetchCartSuccess(products));
    }
    dispatch(cartSuccess());
  } catch (error) {
    console.log(error);
  }
};

export const addToCart = (userId, productId) => async (dispatch) => {
  try {
    dispatch(cartStart());
    const resCart = await axiosClient.post(`/api/users/${userId}/cart/store`, {
      productId,
    });

    if (resCart.status === 200) {
      const resProduct = await axiosClient.get(`/api/products/${productId}`);
      const product = resProduct.data.data;
      if (resProduct === 200) {
        dispatch(addItem(product));
      }
    }
    dispatch(fetchCartItems(userId));
    dispatch(cartSuccess());
  } catch (error) {
    console.log(error);
  }
};

export const removeItemFromCart = (userId, productId) => async (dispatch) => {
  try {
    const res = await axiosClient.delete(
      `/api/users/${userId}/cart/${productId}/delete`
    );
    if (res.status === 200) dispatch(removeItem(productId));
    dispatch(fetchCartItems(userId));
  } catch (error) {
    console.log(error);
  }
};
