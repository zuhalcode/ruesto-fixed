import { connect, disconnect } from "@lib/mongo";
import { sendOk } from "@lib/responseHelper";
import Order from "@model/Order";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connect();
      const order = await Order.find();
      await disconnect();
      return sendOk(res, order);
    } catch (error) {
      return res.json(error);
    }
  }
}
