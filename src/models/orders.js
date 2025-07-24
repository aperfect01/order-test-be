const db = require("../db");

exports.insertOrder = (product, qty, price, callback) => {
  db.run(`INSERT INTO orders (product, qty, price) VALUES (?, ?, ?)`, [product, qty, price], function (err) {
    callback(err, this?.lastID);
  });
};

exports.getOrders = (callback) => {
  db.all(`SELECT * FROM orders`, [], callback);
};
