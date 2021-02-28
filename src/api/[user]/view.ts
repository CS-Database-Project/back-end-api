import { model } from "../../model";
import { ERROR } from "../../model/ERROR";
import { Handler,EHandler, Request, Response, NextFunction } from "../../utilities/types";
import { inputValidator, query } from './../../utilities/validation/inputValidator';

/**
 * Validating Input
 */

const validateInput = inputValidator(
    query("userId").optional().isUUID().withMessage("userId query should be valid uuid"),
    query("email").optional().isEmail().withMessage("email query is not a valid email"),
    query("activeStatus").optional().isBoolean().withMessage("status query is not a valid boolean")
);

/**
 * 
 * @param req 
 * @param res 
 * Preparing Query Parameter
 */
const validateQuery: Handler = (req:Request, res: Response, next: NextFunction) => {

    const queryParams = req.query;
    const paramKeys = Object.keys(queryParams);
    if(paramKeys.length === 0){
        req.body.existsQuery = false;
        next(); 
    }

    req.body.existsQuery = true;
    const validQueryParameters = ["userId", "email", "activeStatus"];

    for(let param of validQueryParameters){
        if(paramKeys.includes(param)){
            req.body.query = { [param]: queryParams[param] };
            next();
        }
    }
}

/**
 * 
 * @param req 
 * @param res 
 * Return all customer details if no query is provided
 * Return sorted customers according to query
 */


const getUserDetails: Handler = async(req: Request, res: Response) => {

  
    const { responseGenerator } = res;
    const { existsQuery } = req.body;

    if(!existsQuery){
        const [error, data] = await model.user.user.getAllUsers();
        if(error != ERROR.NO_ERROR){
            responseGenerator.prebuild().send();
            return;
        } 
        responseGenerator.status.OK().message("User Data").data(data).send();
        return;
    }
    
    const { query } = req.body;
    const key = Object.keys(query).pop() as string;
    const value = Object.values(query).pop() as string;
    const [error, data] = await model.user.user.getSortedUsersByQuery(key, value);

    if(error === ERROR.NO_ERROR){
        return responseGenerator.status.OK().
                                message("User Data").
                                data(data).
                                send();
    }

    if(error === ERROR.NOT_FOUND){
        return responseGenerator.status.NOT_FOUND().
                                message("No User Found").
                                send();
    }
    responseGenerator.prebuild().send();
}


export default [validateInput, validateQuery as EHandler, getUserDetails as EHandler];

