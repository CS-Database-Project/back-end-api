import { ERROR } from '../ERROR';
import {insert, find, update} from '../queryTool';

export interface OrderStatus{
    orderStatusId:string,
    name:string,
}

export class OrderStatusModel{
    static tableName = 'order_status';

    static async addOrderStatus(orderStatusData: OrderStatus):Promise<[ERROR, OrderStatus[]]>{
        const [error, data] = await insert(this.tableName, orderStatusData);
        return [error as ERROR, data as OrderStatus[]];
    }

    static async getOrderStatus(orderStatusId: string):Promise<[ERROR, OrderStatus[]]>{
        const [error, data] = await find(this.tableName,["*"], "order_status_id", orderStatusId);
        return [error as ERROR, data as OrderStatus[]];
    }

    static async updateOrderStatus(orderStatusId: string, orderStatusData: OrderStatus):Promise<[ERROR, OrderStatus[]]>{
        const [error, data] = await update(this.tableName, orderStatusData, "order_status_id", orderStatusId);
        return [error as ERROR, data as OrderStatus[]];
    }

    /* static async addOrderStatusEntry(orderStatusData : OrderStatus){
        const query = "INSERT INTO orderStatus(order_status_id,name) VALUES ($1,$2)";
        const args = [orderStatusData.orderStatusId,
                      orderStatusData.name];
    } */

    
}

