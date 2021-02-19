import { body, inputValidator,param } from '../../utilities/validation/inputValidator';
import { Handler, EHandler } from '../../utilities/types'
import { model } from '../../model/index';
import { ERROR } from '../../model/ERROR';
import { v4 as UUID } from 'uuid';
import { Request, Response } from '../../utilities/types';

const validator = inputValidator(
    param('customAttributeId').isUUID().withMessage("Custom Attribute Id shoud be a valid UUID..."),
);

const deleteCustomAttribute: Handler = async (req: Request,res: Response)=>{

    const {responseGenerator} = res;
    const customAtrributeId= req.params.customAttributeId;

    const result = await model.product.customAtrribute.deleteCustomAttribute(customAtrributeId);

    if(result[0] === ERROR.NO_ERROR) {
    return responseGenerator.
                status.
                OK().
                message("Custom Attribute Successfully Deleted...").
                send();
    }

    if(result[0] === ERROR.NOT_FOUND) {
        return responseGenerator.
                    status.
                    NOT_FOUND().
                    message("Theere is NO PRODUCT for the given ID...").
                    send();
        }
    responseGenerator.prebuild().send();
}

export default [validator,deleteCustomAttribute as EHandler];