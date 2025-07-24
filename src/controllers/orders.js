const orderModel = require("../models/orders");

exports.createOrder = (req, res, next) => {
  const { product, qty, price } = req.body;

  if (!product || qty == null || price == null) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  orderModel.insertOrder(product, qty, price, (err, id) => {
    if (err) return next(err);
    res.status(201).json({ id, product, qty, price });
  });
};

exports.getAllOrders = (req, res, next) => {
  orderModel.getOrders((err, orders) => {
    if (err) return next(err);
    res.json(orders);
  });
};
