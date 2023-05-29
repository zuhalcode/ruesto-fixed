import { connect, disconnect } from "@lib/mongo";
import {
  sendOk,
  sendInternalServerError,
  sendBadRequest,
} from "@lib/responseHelper";
import Product from "@model/Product";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import fs from "fs";

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const category = req.body.category;
      const dirPath = path.join(
        process.cwd(),
        "public",
        "images",
        "products",
        category
      );
      fs.mkdir(dirPath, { recursive: true }, (err) => {
        if (err) return cb(err);
        cb(null, dirPath);
      });
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = file.originalname.replace(/\s+/g, "-").replace(/\..+/g, "");
      cb(null, `${name}-${Date.now()}${ext}`);
    },
  }),
}).single("image");

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "PUT") {
    upload(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        console.error(err);
        return sendBadRequest(res, 500, err.message);
      } else if (err) {
        console.error(err);
        return sendBadRequest(res, 500, err.message);
      }

      const { name, price, desc, category } = req.body;
      const filename = req.file ? req.file.filename : null;

      try {
        await connect();
        const { id } = req.query;
        const productId = mongoose.Types.ObjectId(id);
        const product = await Product.findById(productId);

        if (!product) {
          return sendInternalServerError(res, 404, "Product not found");
        }

        product.name = name;
        product.desc = desc;
        product.price = price;
        product.image = `/images/products/${category}/${filename}`;
        await product.save();

        await disconnect();
        return sendOk(res, product, "Product Updated Successfully");
      } catch (error) {
        console.error(error.message);
        return sendInternalServerError(res, 500, error.message);
      }
    });
  } else {
    return sendInternalServerError(res);
  }
}
