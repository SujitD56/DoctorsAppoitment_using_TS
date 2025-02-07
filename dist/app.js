"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: `./${process.env.NODE_ENV ?? 'local'}.env` });
const router_1 = __importDefault(require("./router"));
const app = (0, express_1.default)();
// connectDatabase();
// Client.connect();
app.use(express_1.default.json());
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({ message });
});
app.use("/v1/", router_1.default);
// app.get("/hello",(req,res)=>{
//   res.send("helllo")
// })
const PORT = 3000;
console.log(PORT);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map