import dotenv from "dotenv";
dotenv.config();

import sqlite3 from "sqlite3";
import path from "path";

const dbPath = process.env.DB_PATH || "./data.db";
const db = new sqlite3.Database(path.resolve(dbPath));

db.serialize(() => {
  console.log("Resetting orders table in data.db...");

  db.run(`DROP TABLE IF EXISTS orders`);
  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product TEXT NOT NULL,
      qty INTEGER NOT NULL,
      price REAL NOT NULL
    )
  `);

  const orders: [string, number, number][] = [
    ['MacBook Pro 14"', 1, 1999.99],
    ["Standing Desk", 1, 450.0],
    ["Noise Cancelling Headphones", 2, 129.95],
    ["Logitech MX Master 3", 3, 89.99],
    ['UltraWide Monitor 34"', 1, 599.99],
  ];

  const stmt = db.prepare(`INSERT INTO orders (product, qty, price) VALUES (?, ?, ?)`);

  orders.forEach(([product, qty, price]) => {
    stmt.run(product, qty, price);
  });

  stmt.finalize();
  console.log("Seed data inserted.");
});

db.close();
