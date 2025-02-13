"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("../swagger");
const router = (0, express_1.Router)();
// Initialize swagger-jsdoc with the options
const swaggerSpec = (0, swagger_jsdoc_1.default)(swagger_1.swaggerOptions);
// Serve Swagger UI at `/api/docs`
router.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
// Serve the raw Swagger JSON at `/api/swagger.json`
router.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});
exports.default = router;
//# sourceMappingURL=swagger.js.map