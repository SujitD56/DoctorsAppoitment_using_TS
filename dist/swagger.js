"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerOptions = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load environment variables
dotenv_1.default.config({ path: `./${process.env.NODE_ENV || 'local'}.env` });
const { PORT } = process.env;
// Swagger definition
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Local Swagger API",
        version: "1.0.0",
        description: "This is a local REST API application made with Express",
    },
    servers: [
        {
            url: `http://localhost:${PORT || 3000}`,
            description: "Local Server",
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
};
// Swagger options
exports.swaggerOptions = {
    swaggerDefinition,
    apis: [
        path_1.default.join(process.cwd(), "src/routes/*.ts"), // Ensure paths match your file structure
        path_1.default.join(process.cwd(), "src/routes/swagger.ts"),
    ],
};
//# sourceMappingURL=swagger.js.map