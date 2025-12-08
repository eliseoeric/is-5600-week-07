// node-src/src/lib/auto-catch.d.ts
declare module './lib/auto-catch' {
  import { Request, Response, NextFunction } from 'express';
  
  type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;
  
  function autoCatch(fn: AsyncHandler): AsyncHandler;
  
  export default autoCatch;
}