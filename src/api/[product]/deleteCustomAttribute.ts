import { body, inputValidator } from '../../utilities/validation/inputValidator';
import { Handler, EHandler } from '../../utilities/types'
import { model } from '../../model/index';
import { ERROR } from '../../model/ERROR';
import { v4 as UUID } from 'uuid';
import { Request, Response } from '../../utilities/types';

const deleteCustomAttribute: Handler = async (req: Request,res: Response)=>{

    const {responseGenerator} = res;
    const customAtrributeId= req.params.id;

    const result = await model.product.customAtrribute.deleteCustomAttribute(customAtrributeId);

    return responseGenerator.
                status.
                OK().
                message("Custom Attribute Successfully Deleted...").
                send();

}

export default [deleteCustomAttribute as EHandler];