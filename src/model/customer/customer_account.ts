import { ERROR } from '../ERROR';
import { query } from '../queryTool';

export interface CustomerAccount{
    customerId:string,
    username:string,
    password:string,
}

export class CustomerAccountModel{

    static tableName = 'customer_account';

    static async findByUsername(username: string):Promise<[ERROR, CustomerAccount[]]>{
        const statement = `SELECT * FROM ${this.tableName} WHERE username=$1;`
        const args = [username];
        const [error, data] = await query(statement, args, true);
        return [error as ERROR, data as CustomerAccount[]];
    }

}