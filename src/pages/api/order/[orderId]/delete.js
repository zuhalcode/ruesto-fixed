import { connect, disconnect } from "@lib/mongo";
import { sendNotFound, sendOk } from "@lib/responseHelper";
import Order from "@model/Order";
import mongoose from "mongoose";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const orderId = mongoose.Types.ObjectId(req.query.orderId);

    try {
      if (orderId) {
        await connect();
        const order = await Order.findByIdAndDelete(orderId);

        if (!order) {
          await disconnect();
          return sendNotFound(res, "Order Not Found");
        }

        await disconnect();
        return sendOk(res, "", "Order Cancelled successfully");
      }
    } catch (error) {
      return res.json(error);
    }
  }
}
