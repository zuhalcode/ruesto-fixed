import { connect, disconnect } from "@lib/mongo";
import { sendOk } from "@lib/responseHelper";
import Order from "@model/Order";
import Product from "@model/Product";
import mongoose from "mongoose";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const orderId = mongoose.Types.ObjectId(req.query.orderId);

    try {
      if (orderId) {
        await connect();
        const order = await Order.findById(orderId);

        const updatedItems = await Promise.all(
          order.items.map(async (item) => {
            const product = await Product.findById(item.product);
            return {
              product: item.product,
              quantity: item.quantity,
              name: product.name,
              price: product.price,
            };
          })
        );

        const updatedOrder = {
          ...order.toObject(),
          items: updatedItems,
        };

        await disconnect();
        return sendOk(res, updatedOrder);
      }

    } catch (error) {
      return res.json(error);
    }
  }
}
