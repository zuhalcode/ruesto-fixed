import { connect, disconnect } from "@lib/mongo";
import { sendConflict, sendNotFound, sendOk } from "@lib/responseHelper";
import Cart from "@model/Cart";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { userId } = req.query;
    const { productId } = req.query;

    try {
      await connect();

      let cart = await Cart.findOne({ user: userId });
      if (!cart) return sendNotFound(res, "Cart Not Found");

      // Remove the item with the given productId from the cart
      const index = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );
      if (index === -1) return sendNotFound(res, "Item Not Found in the cart");
      cart.items.splice(index, 1);

      await cart.save();
      await disconnect();
      return sendOk(res, {}, "Item Removed from cart");
    } catch (error) {
      console.log(error);
      return sendConflict(res, error.message);
    }
  }
}
