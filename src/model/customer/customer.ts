import { find, query, transaction, update } from '../queryTool';
import { CustomerAccount, CustomerAccountModel } from './customer_account';
import { generateToken } from './../../utilities/token';
import { ERROR } from '../ERROR';
import { convertSnakeCase } from './../../utilities/snakeCase';

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
        const query2 = `INSERT INTO ${CustomerAccountModel.tableName}(customer_id,username,password,active_status, usertype) VALUES ($1,$2,$3,$4,$5)`;
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
                       customerAccountData.password,
                       customerAccountData.activeStatus ? 'true' : 'false',
                       customerAccountData.usertype];
        const error = await transaction([query1, query2],[args1, args2]);
        return error;
    }


    static async findByCustomerById(customerId: string): Promise<[ERROR, Customer[]]> {
        const [error, data] = await find(this.tableName, [], 'customer_id', customerId);
        return [error as ERROR, data as Customer[]];
    }

    static async getAllCustomers(): Promise<[ERROR, any]> {
        const statement = `SELECT ${this.tableName}.*,${CustomerAccountModel.tableName}.usertype, ${CustomerAccountModel.tableName}.username, ${CustomerAccountModel.tableName}.active_status FROM ${this.tableName} JOIN ${CustomerAccountModel.tableName} USING(customer_id);`
        const [error, data] = await query(statement, [], true);
        return [error as ERROR, data];
    }

    static async getSortedCustomersByQuery(key:string, value:string) {
        const statement = `SELECT * FROM ${this.tableName} JOIN ${CustomerAccountModel.tableName} USING(customer_id) WHERE ${convertSnakeCase(key)}=$1;`
        const [error, data] = await query(statement, [value], true);
        return [error as ERROR, data];
    }

    static async updateCustomerDetails(customerData: Customer){
        const [error, data] = await update(this.tableName, customerData, 'customerId', customerData.customerId);
        return error; 
    }

    static generateToken(customerPayload: CustomerPayload){
        return generateToken(customerPayload);
    }

}

