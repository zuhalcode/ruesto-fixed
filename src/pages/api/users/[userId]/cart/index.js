import { connect, disconnect } from "@lib/mongo";
import { sendOk } from "@lib/responseHelper";
import Cart from "@model/Cart";
import mongoose from "mongoose";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { readyState } = mongoose.connection;

      // Connection is not established, so connect
      if (readyState === 0) {
        console.log("seket murup bro");
        await connect();
      } else if (readyState === 2) {
        // Connection is still in the process of establishing, wait for it to be ready
        console.log("sante sek bro");
        await new Promise((resolve) =>
          mongoose.connection.once("connected", resolve)
        );
      }

      const userId = req.query.userId;
      const cart = await Cart.findOne({ user: userId });

      // Connection is established, so disconnect
      if (readyState === 1) {
        console.log("tak pateni ges");
        await disconnect();
      }

      return sendOk(res, cart);
    } catch (error) {
      return res.json(error);
    }
  }
}
