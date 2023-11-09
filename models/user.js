const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: Number, required: true },
    address: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    collection: "users",
  }
);

const userModel = mongoose.model("userData", User);

export default userModel;
