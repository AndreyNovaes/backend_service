import { Request, Response, NextFunction } from "express";
import CustomError from "./CustomError";

type ErrorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => void;

const errorMiddleware: ErrorMiddleware = (err, req, res, next) => {
  try {
    if (err instanceof CustomError) {
      return res.status(err.status).json({
        message: err.message,
      });
    }
    if (err instanceof Error) {
      return res.status(500).json({
        tratado: false,
        istanceof: err.constructor.name,
        messageOrStatusCode: err.message,
        stack: err.stack,
      });
    }
    next(err);
  } catch (error) {
    console.error(
      "Deu problema no middleware de error:, output:",
      error
    );
  }
};

export { errorMiddleware };
