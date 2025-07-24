import sqlite3 from "sqlite3";

// Create the in-memory DB instance first
const testDb = new sqlite3.Database(":memory:");

// Mock the db module before importing anything else
jest.mock("../../src/db", () => ({
  __esModule: true,
  default: testDb,
}));

import express from "express";
import request from "supertest";
import ordersRouter from "../../src/routes/orders";

// Set up the schema
beforeAll((done) => {
  testDb.run(
    `CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product TEXT NOT NULL,
      qty INTEGER NOT NULL,
      price REAL NOT NULL
    )`,
    done
  );
});

afterAll((done) => {
  testDb.close(done);
});

describe("POST /api/orders", () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use("/api", ordersRouter);
  });

  it("should insert and return a new order", async () => {
    const newOrder = {
      product: "Mock Test Product",
      qty: 5,
      price: 99.99,
    };

    const res = await request(app).post("/api/orders").send(newOrder);

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject(newOrder);
    expect(res.body.id).toBeDefined();
  });
});
