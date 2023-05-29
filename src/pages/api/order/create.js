import { connect, disconnect } from "@lib/mongo";
import { sendCreated } from "@lib/responseHelper";
import Cart from "@model/Cart";
import Order from "@model/Order";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { user, items, total } = req.body;
    try {
      await connect();

      // Map the items array to add the product to the items
      const newItems = items.map((item) => {
        return { product: item._id, quantity: item.quantity };
      });

      const newOrder = await Order.create({
        user,
        items: newItems,
        total,
      });

      await newOrder.save();

      await Cart.deleteOne({ user: user });

      await disconnect();
      return sendCreated(res, newOrder, "Checkout successfully");
    } catch (error) {
      console.log(error);
    }
  }
}
