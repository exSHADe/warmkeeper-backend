import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions";

const errorMiddleware = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Server error occured ! :(";
  response.status(statusCode).send({
    statusCode,
    message,
  });
 
};
export default errorMiddleware;
