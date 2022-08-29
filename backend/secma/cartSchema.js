// In this code imort mongoose and the create userScema function from  db.js then make modle of the userSchema and export it.
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: { type: String },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
      qty: { type: Number, default: 1 },
    },
  ],
});

const cart = mongoose.model("cart", cartSchema);

module.exports = cart;
