import express, { Request, Response ,NextFunction } from "express";
import dotenv from 'dotenv';
dotenv.config({ path: `./${process.env.NODE_ENV ?? 'local'}.env` });
import { connectDatabase } from "./config/db";
import routes from './router/index';

const app = express();
connectDatabase();

app.use(express.json());
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ message });
});

app.use("/v1/", routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

