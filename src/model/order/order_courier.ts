import {query} from '../queryTool';

export interface OrderCourier{
    orderId:string,
    courierId:string,
}

export class OrderCourierModel{

    static async addOrderCourierEntry(orderCourierData : OrderCourier){
        const query = "INSERT INTO orderCorier(order_id,courier_id) VALUES ($1,$2)";
        const args = [orderCourierData.orderId,
                      orderCourierData.courierId];
    }
}