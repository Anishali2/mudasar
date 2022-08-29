const model = require("../secma/cartSchema");
const productModel = require("../secma/userSema");

exports.new = async (req, res, next) => {
  console.log("New");
  const data = req.body;

  const newCart = {
    user: data.userId,
    products: [
      {
        product: data.productId,
        qty: data.productQty,
      },
    ],
  };
  try {
    const product = await productModel.findOne({ _id: data.productId });
    const cart = await model.create(newCart);
    const updatedCarts = await model
      .findOne({ user: data.userId })
      .populate("products.product");
    res.send(updatedCarts);
  } catch (err) {
    next(err);
  }
};
//\\ UPDATE CART QUANTITY //\\
exports.updateqty = async (req, res, next) => {
  const data = req.body;
  console.log("Update Qty", data);
  try {
    const updateCart = await model.findOneAndUpdate(
      { user: data.userId, "products.product": data.productId },
      { $inc: { "products.$.qty": +data.productQty } },
      { new: true }
    );
    const updatedCarts = await model
      .findOne({ user: data.userId })
      .populate("products.product");
    res.send(updatedCarts);
  } catch (err) {
    next(err);
  }
};

//\\ NEW CART //\\
exports.newproduct = async (req, res, next) => {
  console.log("New Product");
  const data = req.body;
  console.log("Data", data);
  const newCart = {
    product: data.productId,
    qty: data.productQty,
  };
  try {
    const updateCart = await model.findOneAndUpdate(
      { user: data.userId },
      { $push: { products: newCart } },
      { new: true }
    );
    const updatedCarts = await model
      .findOne({ user: data.userId })
      .populate("products.product");
    res.send(updatedCarts);
  } catch (err) {
    next(err);
  }
};

exports.get = async (req, res, next) => {
  //   const id = req.params.id;
  const id = "anishali@gmail.com";
  console.log("id", id);
  try {
    const cart = await model.findOne({ user: id }).populate("products.product");
    res.send(cart);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  const productId = req.params.id;
  const userId = req.body.userId;

  const deleteCart = await model.findOneAndUpdate(
    { user: userId },
    { $pull: { products: { _id: productId } } },
    { new: true }
  );
  const updatedCart = await model
    .findOne({ user: userId })
    .populate("products.product");
  res.send(updatedCart);
};
