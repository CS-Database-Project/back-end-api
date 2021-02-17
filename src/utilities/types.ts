import { Request as ERequest, Response as EResponse, NextFunction } from 'express';
import { ResponseGenerator } from './response/responseGenerator';

export interface Request extends ERequest{

    user: {
        userId: string,
        userType: 'Administrator' | 'Regular'
        firstName: string,
        lastName: string,
        email: string,
    }
}

export interface Response extends EResponse{
    responseGenerator:ResponseGenerator
}

export type Handler = (req: Request, res: Response, next: NextFunction) => void
    
export { Handler as EHandler } from 'express';
export { Request as ERequest } from 'express';
export { Response as EResponse } from 'express';
export { NextFunction } from 'express';