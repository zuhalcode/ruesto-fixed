import { Snap } from "midtrans-client";

const midtransClient = new Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
});

export default midtransClient;
