import dotenv from "dotenv";
dotenv.config();

import path from "path";
import sqlite3 from "sqlite3";

const dbPath = process.env.DB_PATH || "./data.db";
const db = new sqlite3.Database(path.resolve(dbPath), (err) => {
  if (err) {
    console.error("Failed to connect to database:", err.message);
  } else {
    console.log(`Connected to SQLite at ${dbPath}`);
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product TEXT NOT NULL,
      qty INTEGER NOT NULL,
      price REAL NOT NULL
    )
  `);
});

export default db;
