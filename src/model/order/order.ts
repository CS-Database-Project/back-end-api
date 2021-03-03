import { ERROR } from '../ERROR';
import {query, update} from '../queryTool';
import {OrderItemModel} from './order_item';
import { convertSnakeCase } from './../../utilities/snakeCase';
import { OrderStatusModel } from './order_status';


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

export interface OrderStatus{
    orderId:string,
    orderStatusId:String
}

export class OrderModel{
    static tableName='order_details';

    static async getAllOrders(): Promise<[ERROR, any]> {
        const statement = `SELECT 
        od.order_id,
        od.customer_id,
        od.order_date,
        od.delivery_method,
        od.order_status_id,
        od.comments,
        od.dispatched_date,
        od.payment_method_id,
        os.name AS status,
        pm.name AS payment,
        json_agg(json_build_object('productId',oi.product_id, 'variantName', oi.product_variant, 'quantity', oi.quantity, 'unitPrice', oi.unit_price,'product',p.title)) AS items
    FROM ${this.tableName} od
    JOIN ${OrderStatusModel.tableName} os USING(order_status_id)
    JOIN payment_method pm USING(payment_method_id)
    JOIN ${OrderItemModel.tableName} oi USING(order_id)
	JOIN product p USING(product_id)
    GROUP BY (od.order_id,os.name,pm.name);`
        const [error, data] = await query(statement, [], true);
        return [error as ERROR, data];
    }

    static async getSortedOrdersByQuery(key:string, value:string) {
        const statement = `SELECT * FROM ${this.tableName} JOIN ${OrderItemModel.tableName} USING(order_id) WHERE ${convertSnakeCase(key)}=$1;`
        const [error, data] = await query(statement, [value], true);
        return [error as ERROR, data];
    }

    static async updateOrderStatus(orderStatusData: OrderStatus, orderId: string):Promise<[ERROR, OrderStatus[]]>{
        const [error, data] = await update(this.tableName, orderStatusData, "order_id", orderId);
        return [error as ERROR, data as OrderStatus[]];
    }
}