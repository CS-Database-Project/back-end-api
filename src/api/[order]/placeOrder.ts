import { body, inputValidator } from './../../utilities/validation/inputValidator';
import { model } from '../../model';
import { ERROR } from '../../model/ERROR';
import { v4 as UUID } from 'uuid';
import { Request, Response, Handler, EHandler } from '../../utilities/types';

const shippingValidator = inputValidator(
    body('address').exists().withMessage("Address is required..."),
    body('city').exists().withMessage("City is required..."),
    body('postalCode').exists().withMessage("PostalCode is required..."),
    body('country').exists().withMessage("Country required...")
);

const paymentValidator = inputValidator(
    body('paymentMethod').exists().withMessage("Payment Method is required...")
)

const placeOrder:Handler = async(req: Request, res: Response) => {
    const { responseGenerator } = res;
    const { address, city, postalCode, country } = req.body;
    const { customerId, orderDate, orderStatusId, comments, paymentMethodId } = req.body;
    const {  productId, productVariant, quantity, unitPrice } = req.body;

    const orderId = UUID();

    const orderDetails ={
        orderId,
        customerId,
        orderDate,
       // delivery_method,
        orderStatusId,
        comments,
       // dispatchedDate,
        paymentMethodId,
    }

    const orderItem ={
        orderId,
        productId,
        productVariant,
        quantity,
        unitPrice
    }

    const shippingAddress= {
        address,
        city,
        postalCode,
        country
    };

    //const [error, data] = await model.order.order.placeOrder(shippingAddress, orderItem, shippingAddress);
    //const productData = data[0];
  /*  if( error != ERROR.NO_ERROR){
        responseGenerator.prebuild().send();
        return;
    }

    responseGenerator.
    status.OK().
    message("Place Order successful...").
    data(shippingAddress).
    send();*/

        responseGenerator.
        status.OK().
        message("Place Order successful...").
        data(orderDetails).
        send();
    


}

export default [shippingValidator, paymentValidator, placeOrder as EHandler];

