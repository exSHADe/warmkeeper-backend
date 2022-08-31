import { NextFunction, Request, Response } from "express";

const loggerMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  // push data to mongo
  console.log(`${request.method} ${request.path} ${request.ip}`);
  next();
};
export default loggerMiddleware;
