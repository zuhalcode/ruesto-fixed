import { connect, disconnect } from "@lib/mongo";
import { sendOk, sendInternalServerError } from "@lib/responseHelper";
import Product from "@model/Product";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connect();
      const productId = req.query.id;
      const product = await Product.findOne({ _id: productId });
      await disconnect();

      if (!product) {
        return sendInternalServerError(res, 404, "Product not found");
      }

      return sendOk(res, product);
    } catch (error) {
      console.error(error);
      return sendInternalServerError(res, 500, error.message);
    }
  }
  return sendInternalServerError(res);
}
