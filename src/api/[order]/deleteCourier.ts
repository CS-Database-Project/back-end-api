import { inputValidator,param } from './../../utilities/validation/inputValidator';
import { model } from "../../model";
import { Handler, EHandler} from "../../utilities/types";
import {Request, Response} from "../../utilities/types";
import { ERROR } from '../../model/ERROR';


const validator = inputValidator(
    param('courierId').isUUID().withMessage("Courier Id should be valid UUID...")
);

const deleteCourier: Handler = async (req:Request , res:Response)=>{

    const{responseGenerator}=res;
    const courierId=req.params.courierId;

    const error = await model.order.courier.deleteCourier(courierId);
    if(error[0] === ERROR.NO_ERROR){
        return responseGenerator.
                    status.
                    OK().
                    message("Courier Successfully Deleted...").
                    send();
    }
    if(error[0] === ERROR.NOT_FOUND){
        return responseGenerator.
                status.
                NOT_FOUND().
                message("No Courier Found").
                send();
    }
    responseGenerator.prebuild().send();    
}

export default [validator,deleteCourier as EHandler];
