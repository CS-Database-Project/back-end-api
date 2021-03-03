import { body, inputValidator, param } from '../../utilities/validation/inputValidator';
import { Handler, EHandler } from '../../utilities/types'
import { model } from '../../model/index';
import { ERROR } from '../../model/ERROR';
import { Request, Response } from '../../utilities/types';

const validator = inputValidator(
    body('orderStatusId').exists().withMessage("Order Status Id should be valid"),
    param('orderId').isUUID().withMessage('Order Id shoul be valid UUID') 
)


const updateOrderStatus: Handler = async (req: Request,res: Response)=>{

    const {responseGenerator} = res;
    const {orderStatusId} = req.body;
    const orderId = req.params.orderId;

    const orderStatusData={
        orderId,
        orderStatusId
    }

    const error = await model.order.order.updateOrderStatus(orderStatusData,orderId);
    if (error[0] === ERROR.NO_ERROR) {
        return responseGenerator.
                status.
                OK().
                data(orderStatusData).
                message("Order Status Successfully Updated...").
                send();
    }
    if(error[0] === ERROR.NOT_FOUND){
        return responseGenerator.
                status.
                NOT_FOUND().
                message("No Order Found").
                send();
    }
    responseGenerator.prebuild().send();
}

export default [validator,updateOrderStatus as EHandler];