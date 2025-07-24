import express from "express";
import db from "../db";
import { summarizeOrders } from "../utils/summarizeOrders";
import { Order } from "../types/order";
import { isValidOrderInput } from "../utils/validateOrderInput";

const router = express.Router();

// GET /api/summary
router.get("/summary", (req, res, next) => {
  db.all(`SELECT * FROM orders`, [], (err, rows: Order[]) => {
    if (err) return next(err);
    const summary = summarizeOrders(rows);
    res.json(summary);
  });
});

// GET /api/orders?product=&limit=&offset=
router.get("/orders", (req, res, next) => {
  const { product, limit = 50, offset = 0 } = req.query;

  let query = "SELECT * FROM orders";
  const params: any[] = [];

  if (product) {
    query += " WHERE product LIKE ?";
    params.push(`%${product}%`);
  }

  query += " LIMIT ? OFFSET ?";
  params.push(Number(limit), Number(offset));

  db.all(query, params, (err, rows: Order[]) => {
    if (err) return next(err);
    res.json(rows);
  });
});

// POST /api/orders
router.post("/orders", (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is required" });
  }

  const { product, qty, price } = req.body;

  if (!isValidOrderInput(req.body)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const stmt = `INSERT INTO orders (product, qty, price) VALUES (?, ?, ?)`;

  db.run(stmt, [product, qty, price], function (err) {
    if (err) return next(err);

    const newOrder: Order = {
      id: this.lastID,
      product,
      qty,
      price,
    };

    res.status(201).json(newOrder);
  });
});

export default router;
