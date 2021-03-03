import { body, inputValidator } from './../../utilities/validation/inputValidator';
import { model } from '../../model';
import { ERROR } from '../../model/ERROR';
import { v4 as UUID } from 'uuid';
import { Request, Response, Handler, EHandler } from '../../utilities/types';

const orderDetailsValidator= inputValidator(
    body('customerId').isUUID().withMessage("Invalid customerID"),
    // body('orderDate').exists().withMessage("Order date is required"),
    // body('orderStatusId').exists().withMessage("Order Status Id is required"),
    // body('deliveryMethod').exists().withMessage("delivery Method is required"),
    body('products').exists().withMessage('Products require')
)

const paymentValidator = inputValidator(
    body('paymentMethodId').exists().withMessage("Payment Method is required...")
)


const placeOrder:Handler = async(req: Request, res: Response) => {
    const { responseGenerator } = res;
    const { customerId, orderDate, orderStatusId, comments, dispatchedDate, paymentMethodId , deliveryMethod} = req.body;
    const { products } = req.body;

    const orderId = UUID();

    const orderDetails={
        orderId,
        customerId,
        orderDate:new Date(),
        deliveryMethod,
        orderStatusId,
        comments:"",
        dispatchedDate:new Date(),
        paymentMethodId
    }



    let orderItemData =[];

    for(let i = 0; i < products.length; i++){
        const values:string[] = Object.values(products[i]);
          
        let productId= values[0];
        let quantity = values[4];
        let unitPrice = (parseFloat(values[5])/parseInt(quantity)).toString();
        let productVariant = values[2];

        let orderItemDetails= {
          orderId,
          productId,
          productVariant,
          quantity,
          unitPrice,
        }

        orderItemData.push(orderItemDetails);

    }

    const [error, data] = await model.order.placeOrder.addOrderDetails(orderDetails ,orderItemData);
    if( error != ERROR.NO_ERROR){
        responseGenerator.prebuild().send();
        return [error as ERROR];
    }


    responseGenerator.
    status.OK().
    message("Place Order successful...").
    send()



}



export default [orderDetailsValidator/*, paymentValidator*/,placeOrder as EHandler];

