import { RequestHandler, ErrorRequestHandler } from "express";

const notFound: RequestHandler = (req, res, next) => {
  res.status(404);
  const error = new Error(`Not Found = ${req.originalUrl}`);
  next(error);
};

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    error: true,
    errorMessage: err.message,
  });
};

export default {
  notFound,
  errorHandler,
};
