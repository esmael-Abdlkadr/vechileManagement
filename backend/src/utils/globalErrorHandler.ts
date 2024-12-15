interface Error {
  statusCode?: number;
  status?: string;
  message: string;
}

interface Request {
  body: object;
}

interface Response {
  status: (code: number) => Response;
  json: (body: object) => void;
}

interface NextFunction {
  (): void;
}

const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
  next();
};

export { errorMiddleware };
