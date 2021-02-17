import { body, inputValidator } from './../../utilities/validation/inputValidator';
import { Handler, EHandler } from '../../utilities/types'
import { model } from './../../model/index';
import { ERROR } from '../../model/ERROR';
import { v4 as UUID } from 'uuid';
import { Request, Response } from '../../utilities/types';


const validator = inputValidator(
    body('name').exists().withMessage("Courier name is required...")
);

const addCourier:Handler = async(req: Request, res: Response) => {

    
    const { responseGenerator } =  res;
    const { name } = req.body;
    
    const courierId = UUID();
    
    
    const courierData = {
        courierId,
        name
    };

    const error = await model.order.courier.addCourier(courierData);
    if(error[0] === ERROR.NO_ERROR){
        return responseGenerator.
                status.
                OK().
                message("Successfully added...").
                data(courierData).
                send();
    }
    if(error[0] == ERROR.DUPLICATE_ENTRY){
        return responseGenerator.
                status.
                BAD_REQUEST().
                message("Courier Already Exists...").
                send();
    }
    
    responseGenerator.prebuild().send();   
}

export default [validator, addCourier as EHandler];