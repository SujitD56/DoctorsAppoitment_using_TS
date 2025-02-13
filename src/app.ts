import express, { Request, Response ,NextFunction } from "express";
import dotenv from 'dotenv';
dotenv.config({ path: `./${process.env.NODE_ENV ?? 'local'}.env` });
import Client from "./config/pg";
import router from "./router";
import swaggerRouter from "./router/swagger";

const app = express();
// connectDatabase();
// Client.connect();
app.use(express.json());
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({ message });
});

// import express, { Application } from "express";


// const app: Application = express();

app.use("/api", swaggerRouter);
app.use("/v1", router);

// app.get("/hello",(req,res)=>{
//   res.send("helllo")
// })

const PORT =  3000;

console.log(PORT)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger Docs available at http://localhost:${PORT}/api/docs`);
});

