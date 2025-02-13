"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new pg_1.Client({
    user: process.env.PG_USER, // PostgreSQL username
    host: process.env.PG_HOST, // Usually "localhost"
    database: process.env.PG_DATABASE, // Ensure this matches your DB name
    password: process.env.PG_PASSWORD, // Your PostgreSQL password
    port: parseInt(process.env.PG_PORT || "5432"),
});
client.connect()
    .then(() => console.log(" Connected to PostgreSQL"))
    .catch(err => console.error(" PostgreSQL connection error:", err));
exports.default = client;
//# sourceMappingURL=pg.js.map