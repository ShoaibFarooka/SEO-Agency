import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    websiteURL: { type: String },
    companyName: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    message: { type: String },
    phone: { type: String },
    reason: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
