import dotenv from "dotenv";
dotenv.config();

import express from "express";
import ordersRouter from "./routes/orders";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/orders", ordersRouter);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
