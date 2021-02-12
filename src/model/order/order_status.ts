import {query} from '../queryTool';

export interface OrderStatus{
    orderStatusId:string,
    name:string,
}

export class OrderStatusModel{

    static async addOrderStatusEntry(orderStatusData : OrderStatus){
        const query = "INSERT INTO orderStatus(order_status_id,name) VALUES ($1,$2)";
        const args = [orderStatusData.orderStatusId,
                      orderStatusData.name];
    }

    
}

