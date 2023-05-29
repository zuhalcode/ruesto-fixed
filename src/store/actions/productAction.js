import axiosClient from "@lib/axios";
import {
  fetchAllProductsFailure,
  fetchAllProductsStart,
  fetchAllProductsSuccess,
} from "@store/slices/productSlice";

export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch(fetchAllProductsStart());
    dispatch(fetchAllProductsSuccess([]));
    const res = await axiosClient.get("/api/products");
    if (res.status === 200) {
      dispatch(fetchAllProductsSuccess(res.data));
    }
  } catch (e) {
    dispatch(fetchAllProductsFailure(e));
    console.log(e.message);
  }
};
