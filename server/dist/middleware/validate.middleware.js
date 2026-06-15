"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = validateBody;
exports.validateQuery = validateQuery;
const zod_1 = require("zod");
function validateBody(schema) {
    return (req, res, next) => {
        try {
            req.body = schema.parse(req.body);
            next();
        }
        catch (e) {
            if (e instanceof zod_1.ZodError) {
                res.status(400).json({
                    error: {
                        code: "VALIDATION_ERROR",
                        message: e.errors.map((err) => `${err.path.join(".")}: ${err.message}`).join("; "),
                    },
                });
                return;
            }
            next(e);
        }
    };
}
function validateQuery(schema) {
    return (req, res, next) => {
        try {
            req.query = schema.parse(req.query);
            next();
        }
        catch (e) {
            if (e instanceof zod_1.ZodError) {
                res.status(400).json({
                    error: {
                        code: "VALIDATION_ERROR",
                        message: e.errors.map((err) => `${err.path.join(".")}: ${err.message}`).join("; "),
                    },
                });
                return;
            }
            next(e);
        }
    };
}
//# sourceMappingURL=validate.middleware.js.map