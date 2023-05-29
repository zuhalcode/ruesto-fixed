import { connect } from "@lib/mongo";
import {
  sendConflict,
  sendCreated,
  sendInternalServerError,
} from "@lib/responseHelper";
import User from "@model/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;
    try {
      await connect();

      // Check if a user with the given username already exists
      const userExist = await User.findOne({ email });
      if (userExist) return sendConflict(res, "Email already used");

      // Hash the password using bcrypt
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user with the hashed password
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();

      return sendCreated(res, newUser, "User created succesfully");
    } catch (err) {
      return sendInternalServerError(res, err.message);
    }
  }
}
