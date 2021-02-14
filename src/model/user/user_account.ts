import { ERROR } from '../ERROR';
import { find,query } from '../queryTool';

export interface UserAccount{
    userId:string,
    username:string,
    password:string,
    activeStatus:boolean,
    usertype:string
}

export class UserAccountModel{

    static tableName = 'user_account';

    static async findByUsername(username: string):Promise<[ERROR, UserAccount[]]>{
        const [error, data] = await find(this.tableName, [], 'username', username);
        return [error as ERROR, data as UserAccount[]];
    }

}