import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import productSlice from "./slices/productSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const store = configureStore({
  reducer: {
    products: productSlice,
    cart: persistReducer(persistConfig, cartSlice),
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);

export default store;
