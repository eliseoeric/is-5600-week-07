import { Request, Response, NextFunction } from 'express';

declare function autoCatch<T extends Record<string, any>>(handlers: T): T;

export default autoCatch;
