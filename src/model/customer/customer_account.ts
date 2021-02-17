import { ERROR } from '../ERROR';
import { find, query, select, update } from '../queryTool';

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

    static async changeAccountStatus(customerId:string, activeStatus:boolean):Promise<ERROR>{
        const [error,data] = await update(this.tableName,{customerId,activeStatus}, 'customerId', customerId);
        return error as ERROR;
    }


    static async updateUsername(oldUsername: string, newUsername: string){
        const [error, data] = await update(this.tableName, { username: newUsername}, 'username', oldUsername);
        return [error,data];
    }

    static async updatePassword(newPassword: string, username: string){
        const [error, data] = await update(this.tableName, { password: newPassword}, 'username', username);
        return [error,data];
    }


}