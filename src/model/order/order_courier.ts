import { ERROR } from '../ERROR';
import {insert, find} from '../queryTool';

export interface OrderCourier{
    orderId:string,
    courierId:string,
}

export class OrderCourierModel{

    static tableName = 'order_courier';

    static async addCourier(orderCourierData: OrderCourier):Promise<[ERROR, OrderCourier[]]>{
        const [error, data] = await insert(this.tableName, orderCourierData);
        return [error as ERROR, data as OrderCourier[]];
    }

    static async getCourier(courierId: string):Promise<[ERROR, OrderCourier[]]>{
        const [error, data] = await find(this.tableName,["*"], "courier_id", courierId);
        return [error as ERROR, data as OrderCourier[]];
    }

    /* static async addOrderCourierEntry(orderCourierData : OrderCourier){
        const query = "INSERT INTO orderCorier(order_id,courier_id) VALUES ($1,$2)";
        const args = [orderCourierData.orderId,
                      orderCourierData.courierId];
    } */
}