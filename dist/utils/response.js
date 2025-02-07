"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const successResponse = (res, data, message) => {
    return res.status(200).json({ success: true, message, data });
};
exports.successResponse = successResponse;
const errorResponse = (res, error, message, statusCode = 500) => {
    return res.status(statusCode).json({ success: false, message, error });
};
exports.errorResponse = errorResponse;
//# sourceMappingURL=response.js.map