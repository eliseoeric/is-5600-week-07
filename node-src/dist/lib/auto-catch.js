"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = autoCatch;
function autoCatch(handlers) {
    const autoHandlers = {};
    Object.keys(handlers).forEach((key) => {
        const handler = handlers[key];
        autoHandlers[key] = ((req, res, next) => Promise.resolve(handler(req, res, next)).catch(next));
    });
    return autoHandlers;
}
