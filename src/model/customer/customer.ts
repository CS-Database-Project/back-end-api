import { query, transaction } from '../queryTool';
import { CustomerAccount, CustomerAccountModel } from './customer_account';
import { generateToken } from './../../utilities/token';
import { ERROR } from '../ERROR';

export interface Customer{
    customerId:string,
    firstName:string,
    lastName:string,
    birthDate:string,
    email: string,
    phone:string,
    address:string,
    city:string,
    state:string
}

interface CustomerPayload{
    customerId:string,
    firstName:string,
    lastName:string,
    birthDate:string,
    email: string,
    phone:string,
    address:string,
    city:string,
    state:string,
    usertype: "Customer"
}

export class CustomerModel{
    static tableName = 'customer';

    static async addCustomerEntry(customerData :Customer, customerAccountData :CustomerAccount){
        const query1 = `INSERT INTO ${this.tableName}(customer_id, first_name, last_name, birth_date,email, phone,address,city,state) VALUES ($1,$2,$3,$4,$5,$6,$7,$8, $9)`;
        const query2 = `INSERT INTO ${CustomerAccountModel.tableName}(customer_id,username,password) VALUES ($1,$2,$3)`;
        const args1= [customerData.customerId,
                      customerData.firstName,
                      customerData.lastName,
                      customerData.birthDate,
                      customerData.email,
                      customerData.phone,
                      customerData.address,
                      customerData.city,
                      customerData.state];

        const args2 = [customerAccountData.customerId,
                       customerAccountData.username, 
                       customerAccountData.password];
        const error = await transaction([query1, query2],[args1, args2]);
        return error;
    }

    static async findByCustomerId(customerId: string): Promise<[ERROR, Customer[]]> {
        const statement = `SELECT * FROM ${this.tableName} WHERE customer_id=$1;`
        const args = [customerId];
        const [error, data] = await query(statement, args, true);
        return [error as ERROR, data as Customer[]];
    }

    static generateToken(customerPayload: CustomerPayload){
        return generateToken(customerPayload);
    }

}

