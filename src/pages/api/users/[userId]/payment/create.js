import { connect } from "@lib/mongo";
import { sendCreated } from "@lib/responseHelper";
import Transaction from "@model/Transaction";

import { disconnect } from "mongoose";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId } = req.query;

    try {
      await connect();

      const newPayment = await Transaction.create({
        user: userId,
        ...req.body,
      });

      await newPayment.save();

      await disconnect();
      return sendCreated(res, newPayment, "Payment Processed");
    } catch (error) {
      console.log(error);
    }
  }
}
