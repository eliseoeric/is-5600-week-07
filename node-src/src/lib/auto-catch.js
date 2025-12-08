// node-src/src/lib/auto-catch.js
module.exports = function autoCatch(fn) {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};