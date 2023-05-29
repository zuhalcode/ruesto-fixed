import { connect, disconnect } from "@lib/mongo";
import { sendBadRequest, sendOk } from "@lib/responseHelper";
import Product from "@model/Product";
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
  if (req.method === "POST") {
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
        const product = new Product({
          name,
          price,
          desc,
          image: `/images/products/${category}/${filename}`,
        });

        await product.save();
        return sendOk(res, product, "New Product Added Successfully");
      } catch (error) {
        console.error(error.message);
        return sendBadRequest(res, 500, error.message);
      } finally {
        await disconnect();
      }
    });
  } else {
    return res.status(404).send("Not Found");
  }
}
