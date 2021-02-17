import { body, inputValidator } from '../../utilities/validation/inputValidator';
import { Handler, EHandler } from '../../utilities/types'
import { model } from '../../model/index';
import { ERROR } from '../../model/ERROR';
import { Request, Response, NextFunction } from '../../utilities/types';

const validator = inputValidator(
    body('orderStatusId').exists()
)


const updateOrderStatus: Handler = async (req: Request,res: Response)=>{

    const {responseGenerator} = res;
    const {orderStatusId} = req.body;
    const orderId = req.params.id;

    const orderStatusData={
        orderId,
        orderStatusId
    }

    const error = await model.order.order.updateOrderStatus(orderStatusData,orderId);

    return responseGenerator.
                status.
                OK().
                message("Order Status Successfully Updated...").
                send();

}

export default [validator,updateOrderStatus as EHandler];