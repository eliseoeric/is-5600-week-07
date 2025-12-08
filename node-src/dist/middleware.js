"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = notFound;
exports.handleError = handleError;
function notFound(_req, res) {
    res.status(404).json({ error: "Not Found" });
}
function handleError(err, _req, res, _next) {
    console.error(err);
    const status = err.status || 500;
    res.status(status).json({ error: err.message || "Internal Error Occurred" });
}
