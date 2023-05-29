import { connect, disconnect } from "@lib/mongo";
import { sendConflict, sendOk } from "@lib/responseHelper";
import Cart from "@model/Cart";
import Product from "@model/Product";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId } = req.query;
    const { productId } = req.body;

    try {
      await connect();
      let cart = await Cart.findOne({ user: userId });
      if (!cart) cart = new Cart({ user: userId });

      const product = await Product.findById(productId);

      // Check if product exist
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
      );

      if (existingItem) existingItem.quantity += 1;
      else cart.items.push({ product: product._id });
      cart.total += product.price;

      await cart.save();
      await disconnect();
      return sendOk(res, cart);
    } catch (error) {
      console.log(error);
      return sendConflict(res, error.message);
    }
  }
}
