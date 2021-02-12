import { ERROR } from '../ERROR';
import { find, query, select } from '../queryTool';

export interface CustomerAccount{
    customerId:string,
    username:string,
    password:string,
    activeStatus:boolean,
    usertype:string
}

export class CustomerAccountModel{

    static tableName = 'customer_account';

    static async findByUsername(username: string):Promise<[ERROR, CustomerAccount[]]>{
        const [error, data] = await find(this.tableName, [], 'username', username);
        return [error as ERROR, data as CustomerAccount[]];
    }

}