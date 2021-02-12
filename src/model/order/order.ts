import {query} from '../queryTool';

export interface Order{
    orderId:string,
    customerId:string,
    orderDate:Date,
    deliveryMethod:string,
    orderStatusId:string,
    comments:string,
    dispatchedDate:string,
    paymentMethodId:string
}

export class OrderModel{
    
}