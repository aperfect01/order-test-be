import express from "express";
import db from "../db";

const router = express.Router();

router.post("/", (req, res, next) => {
  const { product, qty, price } = req.body;

  if (!product || qty == null || price == null) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  db.run(`INSERT INTO orders (product, qty, price) VALUES (?, ?, ?)`, [product, qty, price], function (err) {
    if (err) return next(err);
    res.status(201).json({ id: this.lastID, product, qty, price });
  });
});

router.get("/", (req, res, next) => {
  db.all(`SELECT * FROM orders`, [], (err, rows) => {
    if (err) return next(err);
    res.json(rows);
  });
});

export default router;
