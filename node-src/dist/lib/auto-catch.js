"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = autoCatch;
function autoCatch(fn) {
    return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}
