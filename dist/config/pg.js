"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables from .env file
dotenv_1.default.config();
const client = new pg_1.Client({
    user: process.env.PG_USER, // Your PostgreSQL username
    host: process.env.PG_HOST, // Usually "localhost" or IP address
    database: process.env.PG_DATABASE, // Your database name
    password: process.env.PG_PASSWORD, // Your PostgreSQL password
    port: parseInt(process.env.PG_PORT || '5432'),
    // Default PostgreSQL port is 5432
});
async function testDB() {
    try {
        const res = await client.query("SELECT * FROM users;");
        console.log(res.rows);
    }
    catch (error) {
        console.error("Database Query Error:", error);
    }
}
testDB();
exports.default = client;
//# sourceMappingURL=pg.js.map