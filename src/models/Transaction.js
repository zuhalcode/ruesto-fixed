import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status_code: { type: String, required: true },
  status_message: { type: String, required: true },
  transaction_id: { type: String, required: true, unique: true },
  order_id: { type: String, required: true },
  gross_amount: { type: String, required: true },
  payment_type: { type: String, required: true },
  transaction_time: { type: Date, required: true },
  transaction_status: { type: String, required: true },
  fraud_status: { type: String, required: true },
  va_numbers: { type: [{ bank: String, va_number: String }], required: true },
  bca_va_number: { type: String, required: true },
  pdf_url: { type: String, required: true },
  finish_redirect_url: { type: String, required: true },
});

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);

export default Transaction;
