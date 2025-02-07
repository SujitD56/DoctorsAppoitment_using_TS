import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  user: process.env.PG_USER,        // PostgreSQL username
  host: process.env.PG_HOST,        // Usually "localhost"
  database: process.env.PG_DATABASE,// Ensure this matches your DB name
  password: process.env.PG_PASSWORD,// Your PostgreSQL password
  port: parseInt(process.env.PG_PORT || "5432"),
});

client.connect()
  .then(() => console.log(" Connected to PostgreSQL"))
  .catch(err => console.error(" PostgreSQL connection error:", err));

export default client;