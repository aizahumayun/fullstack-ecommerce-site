//create a asynchandler wrapper function

import type { NextFunction, Request, Response } from "express";

type AsyncFunction = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<any>;

export const asyncHandler = (fn: AsyncFunction) => {
    return async (req: Request, res: Response, next: NextFunction) => {
       try {
        await fn(req, res, next);
       } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({message: error.message});
        } else {
            res.status(500).json({message: "Unknown error"});
        }
       }
    };
}