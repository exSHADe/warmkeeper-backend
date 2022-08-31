import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions";
import AuthService from "../services/AuthService";
import * as jwt from "jsonwebtoken";
import { Middleware } from "@decorators/express";

class AuthMiddleware implements Middleware {
  use(request: Request, response: Response, next: NextFunction): void {
    const authHeader = request.headers["authorization"];
    const incomingToken = authHeader && authHeader.split(" ")[1];
    if (!incomingToken) throw new HttpException(401, "Unauthorized");
    const as = new AuthService();
    jwt.verify(incomingToken, as.getSecret(), (err, user) => {
      if (err) throw new HttpException(403, "Forbidden");
      request.user = user;
      next();
    });
  }
}
export default AuthMiddleware;
/*const loggerMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authHeader = request.headers["authorization"];
  const incomingToken = authHeader && authHeader.split(" ")[1];
  if (!incomingToken) throw new HttpException(401, "Unauthorized");
  const as = new AuthService();
  jwt.verify(incomingToken, as.getSecret(), (err, user) => {
    if (err) throw new HttpException(403, "Forbidden");
    request.user = user;
    next();
  });
};*/
