import { RequestHandler, ErrorRequestHandler } from "express";

const notFound: RequestHandler = (req, res, next) => {
  res.status(404);
  const error = new Error(`Not Found = ${req.originalUrl}`);
  next(error);
};

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 400;
  res.status(statusCode).json({
    requestStatus: {
      error: true,
      message: err.message,
    },
    data: {},
  });
};

export default {
  notFound,
  errorHandler,
};
