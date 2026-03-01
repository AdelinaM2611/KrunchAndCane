import { Request, Response, NextFunction } from "express";
export type JwtPayload = {
    sub: string;
    [key: string]: unknown;
};
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}
export declare function authMiddleware(req: Request, res: Response, next: NextFunction): void;
//# sourceMappingURL=auth.middleware.d.ts.map