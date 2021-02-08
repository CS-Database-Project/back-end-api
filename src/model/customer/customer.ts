import { query, transaction } from '../queryTool';
import { CustomerAccount } from './customer_account';

export interface Customer{
    customerId:string,
    firstName:string,
    lastName:string,
    birthDate:string,
    phone:string,
    address:string,
    city:string,
    state:string
}

export class CustomerModel{

    static async addCustomerEntry(customerData :Customer, customerAccountData :CustomerAccount){
        const query1 = "INSERT INTO customer(customer_id, first_name, last_name, birth_date,phone,address,city,state) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)";
        const query2 = "INSERT INTO customer_account(customer_id,username,password,usertype) VALUES ($1,$2,$3,$4)";
        const args1= [customerData.customerId,
                      customerData.firstName,
                      customerData.lastName,
                      customerData.birthDate,
                      customerData.phone,
                      customerData.address,
                      customerData.city,
                      customerData.state];

        const args2 = [customerAccountData.customerId,
                       customerAccountData.username, 
                       customerAccountData.password,
                       customerAccountData.usertype];
        const error = await transaction([query1, query2],[args1, args2]);
        return error;
    }
}