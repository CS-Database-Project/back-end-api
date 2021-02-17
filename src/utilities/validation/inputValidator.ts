import { Handler, EHandler } from '../types';
import { validationResult, Result, ValidationChain } from 'express-validator';
export { body, header, query, param } from 'express-validator';

const generateValidationResult: Handler = (req, res, next ) => {
    const { responseGenerator } = res;
    const errors: Result = validationResult(req);
    if(!errors.isEmpty()) 
        responseGenerator.status.
                         BAD_REQUEST().
                         data(errors).
                         message("Invalid Request...").
                         send();
    next();
}

export function inputValidator(...validators: ValidationChain[]): EHandler {
    //@ts-ignore
    return [...validators, generateValidationResult as EHandler];
}









