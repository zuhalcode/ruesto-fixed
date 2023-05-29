import { connect, disconnect } from "@lib/mongo";
import { sendOk } from "@lib/responseHelper";
import Order from "@model/Order";
import mongoose from "mongoose";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const orderId = mongoose.Types.ObjectId(req.query.orderId);

    try {
      if (orderId) {
        await connect();
        const order = await Order.findById(orderId);
        order.status = req.body.status;
        await order.save();
        await disconnect();
        return sendOk(res, order, "order update successfull");
      }
    } catch (error) {
      return res.json(error);
    }
  }
}
