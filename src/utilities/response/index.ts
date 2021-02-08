import { NextFunction } from 'express';
import { ERequest, EResponse, Response } from './../types';
import { ResponseGenerator } from './responseGenerator';

export interface ResponseInformation{
    message: string,
    data? : any,
    token? : string
}

export function responseBuilder(req: ERequest, res: EResponse, next: NextFunction){
    (res as Response).responseGenerator = new ResponseGenerator(res); 
    next();
}