import { Request, Response, NextFunction } from "express";
export type AppError = {
    code: string;
    message: string;
    statusCode?: number;
};
export declare function errorHandler(err: Error & {
    statusCode?: number;
    code?: string;
}, _req: Request, res: Response, _next: NextFunction): void;
//# sourceMappingURL=error.middleware.d.ts.map