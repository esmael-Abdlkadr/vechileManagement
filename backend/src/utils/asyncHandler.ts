import { Request, Response, NextFunction } from "express";
interface AsyncHandler {
  (req: Request, res: Response, next: NextFunction): void;
}
const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
): AsyncHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default asyncHandler;
