import { Request, Response, NextFunction } from 'express'

type Handler = (req: Request, res: Response, next: NextFunction) => Promise<any> | any;

type Handlers = Record<string, Handler>;

export default function autoCatch<T extends Handlers>(handlers: T): T {
  const autoHandlers = {} as T

  Object.keys(handlers).forEach((key) => {
    const handler = handlers[key]
    ;(autoHandlers as any)[key] = ((req: Request, res: Response, next: NextFunction) =>
      Promise.resolve(handler(req, res, next)).catch(next)) as Handler
  })

  return autoHandlers
}
