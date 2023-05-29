import { sendBadRequest } from "@lib/responseHelper";
import { connect, disconnect } from "src/lib/mongo";
import User from "src/models/User";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    try {
      await connect();
      const user = await User.findOne({ email });
      if (!user) {
        return sendBadRequest(
          res,
          "Email doesn't exist, check your email again :)"
        );
      }

      // check password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword)
        return sendBadRequest(
          res,
          "Wrong password, check your password again :)"
        );

      return res.json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    } finally {
      await disconnect();
    }
  }
}
