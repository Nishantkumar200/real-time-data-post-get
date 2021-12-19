import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("order", schema);

export default Order;
