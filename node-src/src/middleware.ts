import { Request, Response, NextFunction } from 'express';

/**
 * Set the CORS headers on the response object
 */
function cors(req: Request, res: Response, next: NextFunction): void {
  const origin = req.headers.origin;

  // Set the CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS, XMODIFY');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Max-Age', '86400');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

  next();
}

/**
 * Handle errors
 */
function handleError(err: Error, req: Request, res: Response, next: NextFunction): void {
  // Log the error to our server's console
  console.error(err);

  // If the response has already been sent, we can't send another response
  if (res.headersSent) {
    return next(err);
  }

  // Send a 500 error response
  res.status(500).json({ error: "Internal Error Occurred" });
}

/**
 * Send a 404 response if no route is found
 */
function notFound(req: Request, res: Response): void {
  res.status(404).json({ error: "Not Found" });
}

export {
  cors,
  handleError,
  notFound
};
